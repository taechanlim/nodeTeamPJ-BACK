const express = require('express')
const router = express.Router()
const adminController = require('./adminController.js')
const {Auth} =require()
const {adminAuth} = require


router.get('/',adminController.admin)
router.get('/home',adminController.admin)

router.post('/home',adminController.admin)

router.post('/login',adminController.login)
router.get('/logout',adminController.logout)


router.get('/list',adminController.adminList)
router.get('/info',adminController.adminInfo)
router.post('/info',adminController.postAdminInfo)

router.post('/adminMainPlus',adminController.adminMainplus)
router.post('/adminMainEdit',adminController.adminMainEdit)
router.post('/adminMainDelete',adminController.adminMainDelete)



router.post('/adminSubPlus',adminController.adminSubplus)
router.post('/adminSubEdit',adminController.adminSubEdit)
router.post('/adminSubDelete',adminController.adminSubDelete)


//router 추가
//adminMainPlus , adminMainEdit , adminMainDelete
//adminSubPlus, adminSubEdit, adminSubDelete

module.exports =router

admin,
    login,
    adminCheck,
    logout,
    adminList,
    adminInfo,
    postAdminInfo,
    adminMainPlus,
    adminMainEdit,
    adminMainDelete,
    adminSubPlus,
    adminSubEdit,
    adminSubDelete