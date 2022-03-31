const express = require('express')
const router = express.Router()
const adminController = require('./admin.controller.js')
const {Auth} =require()
const {adminAuth} = require


router.get('/',adminController.admin)

router.get('/home',adminController.admin)
router.post('/home',adminController.admin)
router.get('/logout',adminController.logout)

router.get('/list',adminController.adminList)
router.get('/info',adminController.adminInfo)
router.post('/info',adminController.postAdminInfo)

//router 추가
//adminMainPlus , adminMainEdit , adminMainDelete
//adminSubPlus, adminSubEdit, adminSubDelete

module.exports =router