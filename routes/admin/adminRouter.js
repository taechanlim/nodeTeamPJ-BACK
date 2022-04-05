const express = require('express')
const router = express.Router()
const adminController = require('./adminController.js')




// router.post('/home',adminController.admin)


//admin user
router.post('/userinfo',adminController.userinfo)
router.post('/userinfo_Edit',adminController.userinfo_Edit)
router.post('/userinfo_Delete',adminController.userinfo_Delete)

//admin board
router.post('/boardlist',adminController.boardlist)
router.post('/boardEdit',adminController.boardEdit)

//admin Maincategory
router.post('/MainPlus',adminController.MainPlus)
router.post('/MainEdit',adminController.MainEdit)
router.post('/MainDelete',adminController.MainDelete)

//admin Subcategory
router.post('/SubPlus',adminController.SubPlus)
router.post('/SubEdit',adminController.SubEdit)
router.post('/SubDelete',adminController.SubDelete)



module.exports =router
