const express = require('express')
const router = express.Router()
const userController = require('./userController.js')


router.post('/join',userController.join)

router.post('/login',userController.login)





module.exports = router