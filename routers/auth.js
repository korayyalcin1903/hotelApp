const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth')

router.get('/login', authController.get_login)

router.get('/register', authController.get_register)


module.exports = router