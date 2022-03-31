const express = require('express');
const commentControlloer =  ('./commentControlloer.js');
const router = express.Router()



router.post('/view',commentController.view)

router.post('/write',commentController.write)

router.post('/update',commentController.update)

router.post('/delete',commentController.delete)

//router.post('/like',commentController.like)

module.exports = router;