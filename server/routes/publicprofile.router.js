const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to retrieve public profile data
router.get('/:id', (req, res, next) => { 
  const queryText = `SELECT "id", "first_name", "last_name", "username", "time_user", "zipcode", "skills", "services", "roles", "avatar", "bio" FROM "user"
  WHERE "id" = $1;`;
  pool.query(queryText, [req.params.id])
    .then((response) => res.send(response.rows))
    .catch((error) => {console.log('Error in router GET Public Profile', error)
     res.sendStatus(500)});
});

// GET all connections for one user public view
router.get('/connections/:id', (req, res, next) => { 
    const queryText = `SELECT "connections"."id" AS "connections_id", "connecting_id", "connecting_to_id", "connector_id", "message", "connecting_accepted", "connecting_to_accepted", "connections"."active",
    (SELECT "user"."first_name" FROM "user" WHERE "user"."id" = "connections"."connector_id") AS "connector_first_name", (SELECT "user"."last_name" FROM "user" WHERE "user"."id" = "connections"."connector_id") AS "connector_last_name", (SELECT "user"."username" FROM "user" WHERE "user"."id" = "connections"."connector_id") AS "connector_username", (SELECT "user"."avatar" FROM "user" WHERE "user"."id" = "connections"."connector_id") AS "connector_avatar", 
    (SELECT "user"."first_name" FROM "user" WHERE "user"."id" = "connections"."connecting_id") AS "connecting_first_name", (SELECT "user"."last_name" FROM "user" WHERE "user"."id" = "connections"."connecting_id") AS "connecting_last_name", (SELECT "user"."username" FROM "user" WHERE "user"."id" = "connections"."connecting_id") AS "connecting_username", (SELECT "user"."avatar" FROM "user" WHERE "user"."id" = "connections"."connecting_id") AS "connecting_avatar", 
    (SELECT "user"."first_name" FROM "user" WHERE "user"."id" = "connections"."connecting_to_id") AS "connecting_to_first_name", (SELECT "user"."last_name" FROM "user" WHERE "user"."id" = "connections"."connecting_to_id") AS "connecting_to_last_name", (SELECT "user"."username" FROM "user" WHERE "user"."id" = "connections"."connecting_to_id") AS "connecting_to_username", (SELECT "user"."avatar" FROM "user" WHERE "user"."id" = "connections"."connecting_to_id") AS "connecting_to_avatar"
    FROM "connections"
    WHERE ("connections"."connecting_id" = $1 OR "connections"."connecting_to_id" = $1 OR "connections"."connector_id" = $1) AND "connections"."active" = true AND "connections"."connecting_accepted" AND "connections"."connecting_to_accepted";`;
    pool.query(queryText, [req.params.id])
      .then((response) => res.send(response.rows))
      .catch((error) => {
        console.log('Error in router GET public Activity', error)
        res.sendStatus(500)});
  });


module.exports = router;
