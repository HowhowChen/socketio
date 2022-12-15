const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = process.env.PORT || 3000
const httpServer = require('http').createServer(app)

// Setting Socket.io Server
const io = require('socket.io')(httpServer)

app.engine('hbs', exphbs({ extname: '.hbs' }))
app.set('view engine', 'hbs')

//  setting static files
app.use(express.static('public'))

app.get('/chat', (req, res) => res.render('chat'))

app.get('/', (req, res) => res.render('login'))

/*用戶陣列*/
let users = []

/* 監聽連線狀態 */
io.on('connection', socket => {
  /* 是否為新用戶 */
  let isNewPerson = true

  /* 當前登入用戶 */
  let username = null

  /* 監聽登入事件  */
  socket.on('login', data => {
    for (let i = 0; i < users.length; i++) {
      isNewPerson = (users[i].username === data.username)? false : true
    }
    if (isNewPerson) {
      username = data.username
      users.push({
        username: data.username
      })
      data.userCount = users.length
      /* 發送 登入成功 事件 */
      socket.emit('loginSuccess', data)
      /* 向所有連結的用戶廣播add 事件 */
      io.sockets.emit('add', data)
    } else{
      /*發送 登入失敗 事件*/
      socket.emit('loginFail', '')
    }
  })

  //監聽登出
  socket.on('logout', function(){
    /* 發送 離開成功 事件 */
    socket.emit('leaveSuccess')
    users.map(function(val, index){
        if(val.username === username){
            users.splice(index, 1);
        }
    })
    /* 向所有連接的用戶廣播 有人登出 */
    io.sockets.emit('leave', {username: username, userCount: users.length})
  })
})

httpServer.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
)

module.exports = app