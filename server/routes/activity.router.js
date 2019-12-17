const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// ---- GET's ---- 
// GET all connections for one user
router.get('/', (req, res, next) => { 
  const queryText = `SELECT "connections"."id" AS "connections_id", "connecting_id", "connecting_to_id", "connector_id", "message", "connecting_accepted", "connecting_to_accepted", "connections"."active",
    (SELECT "user"."first_name" FROM "user" WHERE "user"."id" = "connections"."connector_id") AS "connector_first_name", (SELECT "user"."last_name" FROM "user" WHERE "user"."id" = "connections"."connector_id") AS "connector_last_name", (SELECT "user"."username" FROM "user" WHERE "user"."id" = "connections"."connector_id") AS "connector_username", (SELECT "user"."avatar" FROM "user" WHERE "user"."id" = "connections"."connector_id") AS "connector_avatar", 
    (SELECT "user"."first_name" FROM "user" WHERE "user"."id" = "connections"."connecting_id") AS "connecting_first_name", (SELECT "user"."last_name" FROM "user" WHERE "user"."id" = "connections"."connecting_id") AS "connecting_last_name", (SELECT "user"."username" FROM "user" WHERE "user"."id" = "connections"."connecting_id") AS "connecting_username", (SELECT "user"."avatar" FROM "user" WHERE "user"."id" = "connections"."connecting_id") AS "connecting_avatar", 
    (SELECT "user"."first_name" FROM "user" WHERE "user"."id" = "connections"."connecting_to_id") AS "connecting_to_first_name", (SELECT "user"."last_name" FROM "user" WHERE "user"."id" = "connections"."connecting_to_id") AS "connecting_to_last_name", (SELECT "user"."username" FROM "user" WHERE "user"."id" = "connections"."connecting_to_id") AS "connecting_to_username", (SELECT "user"."avatar" FROM "user" WHERE "user"."id" = "connections"."connecting_to_id") AS "connecting_to_avatar"
    FROM "connections"
    WHERE ("connections"."connecting_id" = $1 OR "connections"."connecting_to_id" = $1 OR "connections"."connector_id" = $1) AND "connections"."active" = true;`;
  pool.query(queryText, [req.user.id])
    .then((response) => res.send(response.rows))
    .catch((error) => {
      console.log('Error in router GET User Activity', error)
      res.sendStatus(500)});
});

// ---- PUT's ----
// UPDATE connecting_accepted to true
router.put('/connecting-accept', (req, res) => {
  const queryText = `UPDATE "connections"
    SET "connecting_accepted" = true
    WHERE "id" = $1;`;
  pool.query(queryText, [req.body.connections_id])
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.log('Error in router UPDATE connecting_accepted to true', error);
      res.sendStatus(500)
    })
})
// UPDATE connecting_to_accepted to true
router.put('/connecting-to-accept', (req, res) => {
  const queryText = `UPDATE "connections"
    SET "connecting_to_accepted" = true
    WHERE "id" = $1;`;
  pool.query(queryText, [req.body.connections_id])
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.log('Error in router UPDATE connecting_to_accepted to true', error);
      res.sendStatus(500)
    })
})
// UPDATE deny connection
router.put('/deny-connection', (req, res) => {
  const queryText = `UPDATE "connections"
    SET "active" = false
    WHERE "id" = $1;`;
  pool.query(queryText, [req.body.connections_id])
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.log('Error in router UPDATE deny connection', error);
      res.sendStatus(500)
    })
})


module.exports = router;
