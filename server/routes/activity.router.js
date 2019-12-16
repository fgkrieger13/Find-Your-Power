const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res, next) => { 

  const queryText = `SELECT "user".id AS "user_id", connections.id AS connections_id, connecting_id, connecting_to_id, connector_id, message, connecting_accepted, connecting_to_accepted, first_name, last_name, username, time_user, zipcode, skills, services, roles, avatar FROM "connections"
  JOIN "user" ON connections.connecting_id = "user".id OR connections.connecting_to_id = "user".id OR connections.connector_id = "user".id;`;
  pool.query(queryText)
    .then((response) => res.send(response.rows))
    .catch((error) => {console.log('Error in router GET User Activity', error)
     res.sendStatus(500)});
});

module.exports = router;
