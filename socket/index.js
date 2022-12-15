const { socketAuthenticated } = require('../middleware/authentication')
const privateRooms = require('./events/privateRoom')
const publicRooms = require('./events/publicRoom')
module.exports = io => {
// Store current public users' list
  const publicUsers = []
  /* 監聽連線狀態 */
  io.use(socketAuthenticated).on('connection', async (socket) => {
    const clientsCount = io.engine.clientsCount
    const user = socket.user
    console.log(
      ` ${user.name} connected and number of connections ${clientsCount}`
    )

    publicRooms(io, socket, publicUsers)
    privateRooms(io, socket)
  })
}