'use strict'

const express = require('express')
const router = express.Router()
const authService = require('../services/AuthService');


router.get('/', authService.authorize, (req, res, next) => {
  res.status(200).send({ 'message': 'Olha a fixa, quem olha é bixa!' })
})

module.exports = router
