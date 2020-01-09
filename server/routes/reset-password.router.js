const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const encryptLib = require('../modules/encryption');

// GET user from token 
router.get('/:token', (req, res, next) => {
    const queryText = `SELECT "username", "id" FROM "user" WHERE "token" = $1;`;
    pool.query(queryText, [req.params.token])
        .then((results) => {
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

// PUT updates password
router.put('/:id', (req, res, next) => {
    // get user from token, checks if token is expired
    const queryText = `SELECT "username", "id" FROM "user" WHERE "token" = $1 AND "token_exp" > CURRENT_TIMESTAMP;`;
    pool.query(queryText, [req.body.token])
        .then((results) => {
            if (results.rows[0].id == req.params.id){
                // salt/hash password
                const password = encryptLib.encryptPassword(req.body.password);
                // updates password in user table
                const queryText2 = `UPDATE "user" SET "password" = $1, "token" = null, "token_exp" = null WHERE "id" = $2`
                pool.query(queryText2, [password, req.params.id])
                    .then(() => {
                        res.status(200).send({ message: 'password updated' });
                    })
                    .catch((err) => {
                        console.log('error updating password', err);
                        res.status(404).json('no user exists in db to update')
                    })
            } else {
                res.sendStatus(403)
            }
        })
        .catch((err) => {
            console.log('error in password reset router', err);
            res.json('password reset link is invalid or has expired')
        })
})

module.exports = router;
