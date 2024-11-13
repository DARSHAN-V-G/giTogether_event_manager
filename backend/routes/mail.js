const express = require('express');
const router = express.Router();
const { postData } = require('../controllers/mailcontroller');

router.post('/send', postData);

module.exports = router;
