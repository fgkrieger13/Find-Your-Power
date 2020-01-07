const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto')
// import crypto from 'crypto';
// import User from '../sequelize';



router.post('/', (req, res) => {
    console.log('hitting /forgot-password route with', req.body.email);
    if (req.body.email === '') {
        res.status(400).send('email required');
    }
    const queryText = `SELECT "username", "id" FROM "user" WHERE "username" = $1;`;
    pool.query(queryText, [req.body.email])
        .then((user) => {
            if (user === null) {
                console.error('email not in database');
                res.status(403).send('email not in db');
            } else {
                console.log('found user in db', user);
                // const token = crypto.randomBytes(20).toString('hex');
                // user.update({
                //     resetPasswordToken: token,
                //     resetPasswordExpires: Date.now() + 3600000,
                // });
                // const transporter = nodemailer.createTransport({
                //     service: 'gmail',
                //     auth: {
                //         user: `${process.env.EMAIL_ADDRESS}`,
                //         pass: `${process.env.EMAIL_PASSWORD}`,
                //     },
                // });
                // const mailOptions = {
                //     // change this to a 'no-reply' email
                //     from: 'mySqlDemoEmail@gmail.com',
                //     to: `${user.email}`,
                //     subject: 'Link To Reset Password',
                //     text:
                //         'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
                //         + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
                //         + `http://localhost:3031/reset/${token}\n\n`
                //         + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
                // };
                // console.log('sending mail');
                // transporter.sendMail(mailOptions, (err, response) => {
                //     if (err) {
                //         console.error('there was an error: ', err);
                //     } else {
                //         console.log('here is the res: ', response);
                //         res.status(200).json('recovery email sent');
                //     }
                // });
            }
        });
});


module.exports = router;
