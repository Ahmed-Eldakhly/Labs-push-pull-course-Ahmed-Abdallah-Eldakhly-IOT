
const http = require('http');

const server = http.createServer()

const io = require('socket.io')(server , {
  cors: {
    origin: '*',
    methods: '*'
  }
});

const PORT = 3001


io.on('connection' , (socket) => {
  console.log('New Connection' , socket.id)
  socket.on('message'  , (message) => {
    console.log(message)
    socket.broadcast.emit('new-message' , message)
  })})


server.listen(3001 , (err) => {
  console.info('Server Listening on port 3001')
});

