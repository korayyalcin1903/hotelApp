const express = require('express')
const router = express.Router()

const homeController = require('../controllers/home')
const isAuth = require('../middlewares/isAuth')
const { verifyToken } = require('../middlewares/authentication')

router.get('/', homeController.index)

module.exports = router