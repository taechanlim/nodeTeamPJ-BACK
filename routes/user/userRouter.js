const express = require('express')
const router = express.Router()
const { Auth } = require('../../middlewares/auth')
const userController = require('./userController.js')


router.post('/join',userController.join)

router.post('/login',userController.login)



router.use(Auth)

module.exports = router