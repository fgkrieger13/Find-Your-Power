const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('in search router', req.body.string);
    
    const queryText = `SELECT * FROM "user"
    WHERE "first_name" ILIKE $1 OR "last_name" ILIKE $1 OR "username" ILIKE $1 OR "first_name" ILIKE $1 OR "services" ILIKE $1 OR "services" ILIKE $2;`;
    pool.query(queryText, [req.body.string + '%', '% ' + req.body.string + '%'])
        .then((response) => {
            res.send(response.rows)
        }).catch((error) => {
            console.log('Error in search term router GET', error);
        })
});

module.exports = router;
