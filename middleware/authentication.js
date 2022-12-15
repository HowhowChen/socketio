const jwt = require('jsonwebtoken')
const socketAuthenticated = (socket, next) => {
  const token = socket.handshake.headers.token || socket.handshake.auth.token
  // if (!token) {
  //   return next(
  //     new ApiError('SocketAuthenticatedError', 401, 'Token does not exist')
  //   )
  // }

  socket.user = 123
  return next()
  // jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
  //   if (err) {
  //     return next(new ApiError('SocketAuthenticatedError', 401, 'Unauthorized'))
  //   }
  //   socket.user = await User.findByPk(decoded.id, {
  //     raw: true,
  //     attributes: ['id', 'name', 'avatar', 'account', 'lastJoinPublic']
  //   })
  //   return next()
  // })
}

module.exports = {
  socketAuthenticated
}