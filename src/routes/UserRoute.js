'use strict'

const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.get('/', UserController.get)
router.post('/register', UserController.post)
router.post('/authenticate', UserController.authenticate)

module.exports = router
