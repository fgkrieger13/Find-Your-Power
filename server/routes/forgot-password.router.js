const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');


// Send email for password reset
router.post('/', (req, res) => {
    console.log(process.env.EMAIL_ADDRESS);
    console.log('hitting /forgot-password route with', req.body.email);
    // checks if email is not blank
    if (req.body.email === '') {
        res.status(400).send('email required');
    }
    // finds user by email ("username")
    const queryText = `SELECT "username", "id" FROM "user" WHERE "username" = $1;`;
    pool.query(queryText, [req.body.email])
        .then((results) => {
            console.log('found user in db', results.rows);
            let token = crypto.createHash('sha1').update('abc').digest('hex');
            // updates token with expiration date in user table
            const queryText2 = `UPDATE "user"
                    SET "token" = $2, "token_exp" = '2020-12-31'
                    WHERE "id" = $1;`;
            pool.query(queryText2, [results.rows[0].id, token])
                .then(() => {
                    // logs into gmail account (located in .env)
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: `${process.env.EMAIL_ADDRESS}`,
                            pass: `${process.env.EMAIL_PASSWORD}`,
                        },
                    });
                    // email to send to users with unique URL for password reset
                    const mailOptions = {
                        from: 'no-reply@findyourpower.org',
                        to: `${req.body.email}`,
                        subject: 'Link To Reset Password',
                        text:
                            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
                            + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
                            + `http://localhost:3000/reset/${token}\n\n`
                            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
                    };
                    console.log('sending mail');
                    // sends email
                    transporter.sendMail(mailOptions, (err, response) => {
                        if (err) {
                            console.error('there was an error in transporter.sendMail: ', err);
                            res.sendStatus(500)
                        } else {
                            console.log('here is the res: ', response);
                            res.status(200).json('recovery email sent');
                        }
                    });
                })
                .catch((err) => {
                    console.log('error in /api/forgotpassword, error in PUT token', err);
                    res.sendStatus(500)
                })
        })
        .catch((err) => {
            console.log('error in /api/forgotpassword, error in GET user', err);
            res.status(403).send('email not in db');
        })
});


module.exports = router;
