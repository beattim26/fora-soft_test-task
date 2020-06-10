const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 3001;
const router = require('./router');

const { addUser, removeUser, getUser, getUsers } = require('./users');

io.on('connection', (socket) => {
  socket.on('chat', ({ username, roomname }, cb) => {
    const { user, error } = addUser({ id: socket.id, name, room });

    if (error) return cb(error);

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to ${user.room}`,
    });
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name}, has joined.` });

    socket.join(user.room);

    cb();
  });

  socket.on('sendMessage', (message, cb) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    cb();
  });

  socket.on('disconnect', () => {
    console.log('Connection had left :(');
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port: ${PORT}`));
