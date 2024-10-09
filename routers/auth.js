const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth')

router.get('/login', authController.get_login)


module.exports = router