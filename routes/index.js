const express = require('express')
const { Auth } = require('../middlewares/auth')
const userRouter = require('./user/userRouter.js');
const boardRouter = require('./board/boardRouter.js');
// const mainRouter = require('./main/mainRouter.js')
const adminRouter = require('./admin/adminRouter.js');

const commentRouter = require('./comment/commentRouter.js')
const noticeRouter = require('./notice/noticeRouter.js')
const router = express.Router();

router.use('/api/user',userRouter);
router.use('/api/board',boardRouter);
router.use('/api/comment',commentRouter)
router.use('/api/admin',adminRouter)
router.use('/api/notice',noticeRouter)

router.use(Auth)
module.exports = router;