const express = require('express');
const router = express.Router();
const {
    insertTeam,
    getTeams,
    updateScore
} = require('../controllers/mongoController');

router.post('/postteam',insertTeam);
router.get('/getteam',getTeams);
router.put('/update/:id/score',updateScore);
module.exports = router;