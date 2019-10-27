const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./config/Config')

const app = express()
const server = require('http').Server(app)

// Carrega os Models
const Users = require('./models/User')

// Habilita o CORS

app.use(bodyParser.json({
  limit: '5mb'
}))
app.use(bodyParser.urlencoded({
  extended: false
}))

// Carrega as Rotas e Middlewares
const IndexRoute = require('./routes/IndexRoute')
const UserRoute = require('./routes/UserRoute')
const authService = require('./services/AuthService');

mongoose.connect(config.connectionString, {
  'useNewUrlParser': true,
  'useCreateIndex': true,
  'useFindAndModify': false,
  'useUnifiedTopology': true 
})

app.use(cors())
app.use('/', authService.authorize, IndexRoute)
app.use('/users', UserRoute)

server.listen(process.env.PORT || 3000)
module.exports = app
