const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


/**
 * POST route to add a profile picture to user's profile
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    const imageUrl = req.body.imageUrl;
    const queryString = `UPDATE "user" SET "avatar"=$1 WHERE "id"=$2;`;
    pool.query(queryString, [imageUrl, req.user.id])
    res.sendStatus(200);
});

module.exports = router;