const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = process.env.PORT || 3000
const httpServer = require('http').createServer(app)

const socket = require('./config/socket')
const socketEvents = require('./socket')

// Setting Socket.io Server
const io = socket.initialize(httpServer)
socketEvents(io)

app.engine('hbs', exphbs({ extname: '.hbs' }))
app.set('view engine', 'hbs')

//  setting static files
app.use(express.static('public'))

app.get('/chat', (req, res) => res.render('chat'))

app.get('/', (req, res) => res.render('login'))


httpServer.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
)

module.exports = app