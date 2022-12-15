module.exports = {
  initialize(httpServer) {
    return require('socket.io')(httpServer, {
      cors: {
        origin: [
          'http://localhost:3000'
        ],
        methods: ['GET', 'POST'],
        credentials: true
      },
      allowEIO3: true
    })
  }
}
