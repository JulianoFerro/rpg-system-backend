'use strict'

const express = require('express')
const router = express.Router()


router.get('/', (req, res, next) => {
  res.status(200).send({ 'message': 'Olha a fixa, quem olha é bixa!' })
})

module.exports = router
