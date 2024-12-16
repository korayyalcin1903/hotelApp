const express = require('express')
const router = express.Router()

const homeController = require('../controllers/home')
const isAuth = require('../middlewares/isAuth')

router.get('/', isAuth, homeController.index)

module.exports = router