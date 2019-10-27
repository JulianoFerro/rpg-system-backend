const jwt = require('jsonwebtoken')

exports.generateToken = async (user) => {
  return jwt.sign(user.id, global.SALT_KEY, { expiresIn: '1d' })
}

exports.decodeToken = async (token) => {
  const data = await jwt.verify(token, global.SALT_KEY)
  return data
}

exports.authorize = (req, res, next) => {
  const authHeader = req.body.token || req.query.token || req.headers.authorization

  if (!authHeader) { return res.status(401).json({ 'error': 'No Provided Token' }) }

  const parts = authHeader.split(' ')

  if (!parts.length === 2) { return res.status(401).send({ 'error': 'Token Error' }) }

  const [ scheme, token ] = parts

  if (!/^Bearer$/i.test(scheme)) { return res.status(401).send({ 'error': 'Token Malformated' }) }

  jwt.verify(token, global.SALT_KEY, (error, decoded) => {
    if (error) return res.status(401).json({ error: 'Token Inválido' })
    req.userId = decoded.id
    next()
  })
}
