const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res, next) => { 

  const queryText = `SELECT "connections"."id" AS "connections_id", "connecting_id", "connecting_to_id", "connector_id", "message", "connecting_accepted", "connecting_to_accepted", 
  (SELECT "user"."first_name" FROM "user" WHERE "user"."id" = "connections"."connector_id") AS "connector_first_name", (SELECT "user"."last_name" FROM "user" WHERE "user"."id" = "connections"."connector_id") AS "connector_last_name", (SELECT "user"."username" FROM "user" WHERE "user"."id" = "connections"."connector_id") AS "connector_username", (SELECT "user"."avatar" FROM "user" WHERE "user"."id" = "connections"."connector_id") AS "connector_avatar", 
  (SELECT "user"."first_name" FROM "user" WHERE "user"."id" = "connections"."connecting_id") AS "connecting_first_name", (SELECT "user"."last_name" FROM "user" WHERE "user"."id" = "connections"."connecting_id") AS "connecting_last_name", (SELECT "user"."username" FROM "user" WHERE "user"."id" = "connections"."connecting_id") AS "connecting_username", (SELECT "user"."avatar" FROM "user" WHERE "user"."id" = "connections"."connecting_id") AS "connecting_avatar", 
  (SELECT "user"."first_name" FROM "user" WHERE "user"."id" = "connections"."connecting_to_id") AS "connecting_to_first_name", (SELECT "user"."last_name" FROM "user" WHERE "user"."id" = "connections"."connecting_to_id") AS "connecting_to_last_name", (SELECT "user"."username" FROM "user" WHERE "user"."id" = "connections"."connecting_to_id") AS "connecting_to_username", (SELECT "user"."avatar" FROM "user" WHERE "user"."id" = "connections"."connecting_to_id") AS "connecting_to_avatar"
  FROM "connections";`;
  pool.query(queryText)
    .then((response) => res.send(response.rows))
    .catch((error) => {console.log('Error in router GET User Activity', error)
     res.sendStatus(500)});
});

module.exports = router;
