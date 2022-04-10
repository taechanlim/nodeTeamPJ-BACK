const express = require('express');
const router = express.Router();
const noticeController = require('./noticeController.js')

router.post('/board',noticeController.board);
router.post('/write',noticeController.write);
router.post('/view',noticeController.view);
router.post('/update',noticeController.update);
router.post('/delete',noticeController.delete);

module.exports = router;