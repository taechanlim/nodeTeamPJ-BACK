const express = require('express')
const router = express.Router()
const adminController = require('./adminController.js')




// router.post('/home',adminController.admin)

// router.post('/login',adminController.login)

router.post('/userinfo',adminController.userinfo)
router.post('/userinfo_Edit',adminController.userinfo_Edit)
router.post('/userinfo_Delete',adminController.userinfo_Delete)
router.post('/MainPlus',adminController.MainPlus)
router.post('/MainEdit',adminController.MainEdit)
router.post('/MainDelete',adminController.MainDelete)

// router.post('/adminSubPlus',adminController.adminSubplus)
// router.post('/adminSubEdit',adminController.adminSubEdit)
// router.post('/adminSubDelete',adminController.adminSubDelete)



module.exports =router
