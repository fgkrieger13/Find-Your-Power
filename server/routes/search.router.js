const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:string', (req, res) => {
    console.log('in search router', req.params.string);
    const queryText = `SELECT "first_name", "last_name", "username", "id", "services", "avatar" FROM "user"
    WHERE "first_name" ILIKE $1 OR "last_name" ILIKE $1 OR "username" ILIKE $1 OR "first_name" ILIKE $1 OR "services" ILIKE $1 OR "services" ILIKE $2;`;
    pool.query(queryText, [req.params.string + '%', '% ' + req.params.string + '%'])
        .then((response) => {
            res.send(response.rows)
        }).catch((error) => {
            console.log('Error in search term router GET', error);
        })
});

module.exports = router;
