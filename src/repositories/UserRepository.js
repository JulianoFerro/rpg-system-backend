const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.get = async () => {
  const user = await User.find()
  return user
}

exports.create = async (data) => {
  const user = new User(data)
  await user.save()
  return user
}

exports.authenticate = async (data) => {
  const user = await User.findOne({
    email: data.email
  }).select('+password')
  return user
}
