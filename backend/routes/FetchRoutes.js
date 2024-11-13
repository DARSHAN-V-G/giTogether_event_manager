const express = require('express')
const router = express.Router()
const {
    fetchData,
    postData
} = require('../controllers/FetchController');

router.get('/view',fetchData);
router.post('/postdata',postData);
module.exports = router;