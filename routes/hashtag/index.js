const express = require('express');
const hashtagContorller =  ('./hashtagController.js');
const router = express.Router()


router.post('/serach',hashtagContorller.search)

//router.post('/like',commentController.like)

module.exports = router;