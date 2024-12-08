const express = require('express')
const router = express.Router()

const adminController = require('../controllers/admin');
const isAdmin = require('../middlewares/isAdmin');


router.get('/users', isAdmin, adminController.get_users)
router.get('/users/edit/:userid', isAdmin, adminController.get_edit_users)
router.get('/users/delete/:userid', isAdmin, adminController.post_delete_users)
router.post('/users/edit/:userid', isAdmin, adminController.post_edit_users); 



router.get('/menu', isAdmin, adminController.get_menu);
router.get('/menu/edit/:menuid', isAdmin, adminController.get_menu_edit)
router.get('/menu/delete/:menuid', isAdmin, adminController.get_menu_delete)
router.post('/menu/edit/:menuid', isAdmin, adminController.post_menu_edit)


router.get('/menu/create', isAdmin, adminController.get_menu_create)
router.post('/menu/create', isAdmin, adminController.post_menu_create)


router.get('/order', adminController.get_order);
router.get('/order/:orderid', adminController.get_order_details);
router.get('/order/edit/:orderid', isAdmin, adminController.get_order_edit)
router.get('/order/delete/:orderid', isAdmin, adminController.get_order_delete)
router.post('/order/edit/:orderid', isAdmin, adminController.post_edit_order)





module.exports = router