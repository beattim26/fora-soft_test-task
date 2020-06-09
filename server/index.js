const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 3001;
const router = require('./router');

io.on('connection', (socket) => {
  console.log('New connection!');

  socket.on('chat', ({ username, roomname }, callback) => {
    console.log(username, roomname);
  });

  socket.on('disconnect', () => {
    console.log('Connection had left :(');
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port: ${PORT}`));
