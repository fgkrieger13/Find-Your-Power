const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { checkConnectingAuthorized, checkConnectingToAuthorized, checkAuthorizationToDeny } = require('../modules/authorization-middleware');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



// ---- GET's ---- 
// GET all existing connections for logged in user private view
router.get('/', rejectUnauthenticated, (req, res, next) => { 
  const queryText = `SELECT "connections"."id" AS "connections_id", "connecting_id", "connecting_to_id", "connector_id", "message", "connecting_accepted", "connecting_to_accepted", "connections"."active",
    (SELECT "user"."first_name" FROM "user" WHERE "user"."id" = "connections"."connector_id") AS "connector_first_name", (SELECT "user"."last_name" FROM "user" WHERE "user"."id" = "connections"."connector_id") AS "connector_last_name", (SELECT "user"."username" FROM "user" WHERE "user"."id" = "connections"."connector_id") AS "connector_username", (SELECT "user"."avatar" FROM "user" WHERE "user"."id" = "connections"."connector_id") AS "connector_avatar", (SELECT "user"."venmo" FROM "user" WHERE "user"."id" = "connections"."connector_id") AS "connector_venmo", 
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
// UPDATE connecting_accepted to true after user has clicked Accept button
router.put('/connecting-accept', rejectUnauthenticated, checkConnectingAuthorized, (req, res) => {
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
// UPDATE connecting_to_accepted to true after user has clicked Accept button
router.put('/connecting-to-accept', rejectUnauthenticated, checkConnectingToAuthorized, (req, res) => {
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
// UPDATE deny connection status when user clicks the Deny button
router.put('/deny-connection', rejectUnauthenticated, checkAuthorizationToDeny, (req, res) => {
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

// ---- POST's ----
// POST new initiated connection to the database
router.post('/', rejectUnauthenticated, async (req, res) => {
  console.log(req.body);
  
  
  const connection = await pool.connect();
  try {
    await connection.query('BEGIN;')
    sqlText1 = `SELECT * FROM "connections"
      WHERE ("connecting_id" = $1 AND "connecting_to_id" = $2) OR ("connecting_id" = $2 AND "connecting_to_id" = $1) AND "active" = 'true';`;
    sqlText2 = `INSERT INTO "connections" ("connecting_id", "connecting_to_id", "connector_id", "message")
    VALUES ($1, $2, $3, $4);`;
    // Check to see if a connection already exists between the two users
    activeConnection = await connection.query(sqlText1, [req.body.connecting_id, req.body.connecting_to_id]);
    console.log('active connection:', activeConnection.rows);
    // Add new connection between connecting user and connecting_to user into the database if there is not already a connection between them
    if(activeConnection.rows.length < 1){
      await connection.query(sqlText2, [req.body.connecting_id, req.body.connecting_to_id, req.body.connector_id, req.body.message])
      await connection.query('COMMIT;')
      res.sendStatus(200)
    }
    else {
      await connection.query('COMMIT;')
      res.sendStatus(406)
    }
  } catch (err) {
    console.log('error in initate connection router', err);
    
    await connection.query('ROLLBACK;')
    res.sendStatus(500)
  } finally {
    connection.release(); // end
  }
})

module.exports = router;
