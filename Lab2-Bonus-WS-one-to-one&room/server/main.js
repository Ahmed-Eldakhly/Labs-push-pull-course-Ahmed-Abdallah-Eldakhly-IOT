
const http = require('http');

const server = http.createServer()

const io = require('socket.io')(server , {
  cors: {
    origin: '*',
    methods: '*'
  }
});

const PORT = 3002
let counter = 1;
// io.on('connection' , (socket) => {
//   console.log('New Connection' , socket.id)
io.on("connection", (socket) => {
  if(counter == 1 )
  {
    socket.join("room1");
    counter = 2
  }
  else
  {
    socket.join("room2");
    counter = 1
  }
  // console.log(socket.rooms); // Set { <socket.id> }

  console.log("the socetId is" , socket.id); 

  console.log("the roomId is" , socket.rooms); 
  socket.on('message'  , (message) => {
    console.log(message)
  if(message.userId){
      console.log("private message to:", message.userId)
      io.to(message.userId).emit("new-message", message.msg)
  }
  else if(message.group)
  {
    console.log("group message to:", message.group)
    socket.to(message.group).emit("new-message", message.msg)
  }
  else
      socket.broadcast.emit("new-message", message.msg)
  })})


server.listen(PORT , (err) => {
  console.info('Server Listening on port ' + PORT)
});

