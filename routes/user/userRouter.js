const express = require('express')
const router = express.Router()
const userController = require('./userController.js')


router.post('/join',userController.join)
// router.post('/idcheck',userController.idcheck)
router.post('/login',userController.login)
router.post('/logout',userController.logout)




module.exports = router