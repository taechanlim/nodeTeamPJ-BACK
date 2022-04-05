const express = require('express');
const router = express.Router();
const boardController = require('./boardController.js')
// const { upload } = require('../../utils/uploads_board.js')
// upload.fields({name:'upload1'},{name:'upload2'},{name:'upload3'},{name:'upload4'})
router.post('/list',boardController.list);
router.post('/write',boardController.write);
router.post('/view',boardController.view);
router.post('/update',boardController.update);
router.post('/delete',boardController.delete); 

router.post('/pop',boardController.pop)
router.post('/search',boardController.search)

module.exports = router;