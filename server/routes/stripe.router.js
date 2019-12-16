require('dotenv').config();
const express = require('express');
const router = express.Router();


const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const stripe = require("stripe")(keySecret);



router.post("/charge", (req, res) => {

    (async () => {
        const charge = await stripe.charges.create({
            amount: 1000,
            currency: 'usd',
            source: 'tok_visa',
            receipt_email: 'jenny.rosen@example.com',
        });
        res.send(charge)
    })();
});

module.exports = router;