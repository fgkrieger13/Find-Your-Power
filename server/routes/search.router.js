const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET search results from user database based on what the user types into search bar
router.get('/:string', (req, res) => {
    console.log('in search router', req.params.string);
    const queryText = `SELECT "first_name", "last_name", "username", "id", "services", "skills", "avatar" FROM "user"
    WHERE "first_name" ILIKE $1 OR "last_name" ILIKE $1 OR "username" ILIKE $1 OR "first_name" ILIKE $1 OR CONCAT("first_name", ' ', "last_name") ILIKE $1 OR "services" ILIKE $1 OR "services" ILIKE $2 OR "skills" ILIKE $1 OR "skills" ILIKE $2;`;
    pool.query(queryText, [req.params.string + '%', '% ' + req.params.string + '%'])
        .then((response) => {
            res.send(response.rows)
        }).catch((error) => {
            console.log('Error in search term router GET', error);
        })
});

module.exports = router;
