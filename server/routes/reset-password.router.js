const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// const nodemailer = require('nodemailer');
// const crypto = require('crypto');

router.get('/:token', (req, res, next) => {
    console.log('in /api/resetpassword', req.params.token);
    const queryText = `SELECT "username", "id" FROM "user" WHERE "token" = $1 AND "token_exp" > CURRENT_TIMESTAMP;`;
    pool.query(queryText, [req.params.token])
        .then((results) => {
            console.log('success, found user:', results.rows);
            res.status(200).send({
                username: results.rows[0].username,
                message: 'password reset link a-ok',
            })
        })
        .catch((err) => {
            console.log('error in password reset router', err);
            res.json('password reset link is invalid or has expired')
        })
})


module.exports = router;
