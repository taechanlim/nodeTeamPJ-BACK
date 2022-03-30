const express = require('express')
const router = express.Router()
const userController = require('./userController.js')
const { upload } = require('../../utils/uploads.js')

router.post('/join',upload.single('img'),userController.join)
router.post('/idcheck',userController.idcheck)
router.post('/login',userController.login)





module.exports = router