const Repository = require('../repositories/UserRepository')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi')

const generateToken = (params = []) => {
  return jwt.sign(params, global.SALT_KEY, { expiresIn: '1d' })
}

exports.get = async (req, res, next) => {
  try {
    const user = await Repository.get()
    res.status(200).send(user)
  } catch (error) {
    res.status(500).send({
      message: error
    })
  }
}

exports.post = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    })
    await Joi.validate(req.body, schema)
    const user = await Repository.create({ ...req.body, user: req.userId })
    user.password = undefined
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send({
      message: error
    })
  }
}

exports.authenticate = async (req, res, next) => {
  const { password } = req.body

  try {
    const user = await Repository.authenticate(req.body)

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(404).send({
        message: 'Usuário ou senha inválidos'
      })
    }

    res.status(201).send({
      user,
      token: generateToken({ id: user.id })
    })
  } catch (error) {
    res.status(500).send({
      message: error
    })
  }
}
