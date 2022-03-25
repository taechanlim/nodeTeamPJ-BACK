const express = require('express');
const router = express.Router();
const boardController = require('./boardController.js')

router.post('/list',boardController.list);
router.post('/write',boardController.write);
// router.post('/view',boardController.view);


module.exports = router;