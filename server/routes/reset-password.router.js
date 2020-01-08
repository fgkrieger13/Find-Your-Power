const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const encryptLib = require('../modules/encryption');

// const nodemailer = require('nodemailer');
// const crypto = require('crypto');

router.get('/:token', (req, res, next) => {
    console.log('in /api/resetpassword', req.params.token);
    const queryText = `SELECT "username", "id" FROM "user" WHERE "token" = $1;`;
    pool.query(queryText, [req.params.token])
        .then((results) => {
            console.log('success, found user:', results.rows);
            res.status(200).send({
                username: results.rows[0].username,
                message: 'password reset link a-ok',
                id: results.rows[0].id
            })
        })
        .catch((err) => {
            console.log('error in password reset router', err);
            res.json('password reset link is invalid or has expired')
        })
})


router.put('/:id', (req, res, next) => {
    console.log('in PUT update password for', req.params.id);
    const queryText = `SELECT "username", "id" FROM "user" WHERE "token" = $1 AND "token_exp" > CURRENT_TIMESTAMP;`;
    pool.query(queryText, [req.body.token])
        .then((results) => {
            console.log(results.rows[0].id);
            if (results.rows[0].id == req.params.id){
                const password = encryptLib.encryptPassword(req.body.password);
                const queryText2 = `UPDATE "user" SET "password" = $1, "token" = null, "token_exp" = null WHERE "id" = $2`
                pool.query(queryText2, [password, req.params.id])
                    .then(() => {
                        console.log('password updated for', req.body.username);
                        res.status(200).send({ message: 'password updated' });
                    })
                    .catch((err) => {
                        console.log('error updating password', err);
                        res.status(404).json('no user exists in db to update')
                    })
            } else {
                console.log('no match for id');
                res.sendStatus(403)
            }
        })
        .catch((err) => {
            console.log('error in password reset router', err);
            res.json('password reset link is invalid or has expired')
        })
})

module.exports = router;
