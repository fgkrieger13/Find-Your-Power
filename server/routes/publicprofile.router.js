const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res, next) => { 
  const queryText = `SELECT "id", "first_name", "last_name", "username", "time_user", "zipcode", "skills", "services", "roles", "avatar", "bio" FROM "user"
  WHERE "id" = $1;`;
  pool.query(queryText, [req.params.id])
    .then((response) => res.send(response.rows))
    .catch((error) => {console.log('Error in router GET Public Profile', error)
     res.sendStatus(500)});
});

module.exports = router;
