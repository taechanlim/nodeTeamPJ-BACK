const express = require('express');
const router = express.Router();
const commentController =  require('./commentController');


router.post('/list',commentController.list)
router.post('/write',commentController.write)
router.post('/delete',commentController.delete)
// router.post('/update',commentController.update)
//router.post('/like',commentController.like)

module.exports = router;

