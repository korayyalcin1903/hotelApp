const express = require('express')
const router = express.Router()

const adminController = require('../controllers/admin')

router.get('/', adminController.get_admin_index); //  /admin adresini yönlendirir





router.get('/admins', adminController.get_admins)
router.get('/admins/edit/:userid', adminController.get_edit_admins)
router.get('/admins/delete/:userid', adminController.post_delete_admins)
router.post('/admins/edit/:userid', adminController.post_edit_admins); 


router.get('/users', adminController.get_users)
router.get('/users/edit/:userid', adminController.get_edit_users)
router.get('/users/delete/:userid', adminController.post_delete_users)
router.post('/users/edit/:userid', adminController.post_edit_users); 



router.get('/menu', adminController.get_menu);
router.get('/menu/edit/:menuid', adminController.get_menu_edit)
router.get('/menu/delete/:menuid', adminController.get_menu_delete)
router.post('/menu/edit/:menuid', adminController.post_menu_edit)


router.get('/menu/create', adminController.get_menu_create)
router.post('/menu/create', adminController.post_menu_create)


router.get('/order', adminController.get_order);
router.get('/order/edit/:orderid', adminController.get_order_edit)
router.get('/order/delete/:orderid', adminController.get_order_delete)
router.post('/order/edit/:orderid', adminController.post_edit_order)





module.exports = router