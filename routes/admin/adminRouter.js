const express = require('express')
const router = express.Router()
const adminController = require('./adminController.js')




// router.post('/home',adminController.admin)

// router.post('/login',adminController.login)

// router.post('/info',adminController.postAdminInfo)

router.post('/adminMainPlus',adminController.adminMainPlus)
router.post('/adminMainEdit',adminController.adminMainEdit)
router.post('/adminMainDelete',adminController.adminMainDelete)

// router.post('/adminSubPlus',adminController.adminSubplus)
// router.post('/adminSubEdit',adminController.adminSubEdit)
// router.post('/adminSubDelete',adminController.adminSubDelete)



module.exports =router
