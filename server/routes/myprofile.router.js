const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

// UPDATE user's profile page with the information that they input
router.put('/:id', rejectUnauthenticated, (req, res, next) => {
  const queryText = `UPDATE "user" 
  SET first_name = $1, 
  last_name = $2,
  username = $3,
  zipcode = $4,
  skills = $5,
  services = $6,
  roles = $7,
  bio = $8,
  venmo = $9
  WHERE "user".id=$10;`;
  pool.query(queryText, [req.body.first_name, req.body.last_name, req.body.username, req.body.zipcode, req.body.skills, req.body.services, req.body.roles, req.body.bio, req.body.venmo, req.user.id])
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.log('Error in router PUT My Profile', error)
      res.sendStatus(500)
    });
});

module.exports = router;
