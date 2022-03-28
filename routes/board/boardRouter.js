const express = require('express');
const router = express.Router();
const boardController = require('./boardController.js')

router.post('/list',boardController.list);
router.post('/write',boardController.write);
router.post('/view',boardController.view);
// router.get('/update',boardController.getUpdate);
router.post('/update',boardController.postUpdate);
// router.post('/delete',boardController.delete);


module.exports = router;