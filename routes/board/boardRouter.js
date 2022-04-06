const express = require('express');
const router = express.Router();
const boardController = require('./boardController.js')

router.post('/list',boardController.list);
router.post('/write',boardController.write);
router.post('/view',boardController.view);
router.post('/likes',boardController.likes);
router.post('/update',boardController.update);
router.post('/delete',boardController.delete); 

router.post('/pop',boardController.pop)
router.post('/search',boardController.search)

module.exports = router;