const express = require('express')
const router = express.Router()

const adminController = require('../controllers/admin')

router.get('/order', adminController.get_order)

router.get('/users', adminController.get_users)

router.get('/user/edit/:userid', adminController.get_edit_user)
// router.get('/user/delete/:userid', adminController.get_edit_user)

router.get('/menu', adminController.get_menu)

router.get('/menu/create', adminController.get_menu_create)

router.get('/menu/edit/:menuid', adminController.get_menu_edit)

router.get('/menu/delete/:menuid', adminController.get_menu_delete)

module.exports = router