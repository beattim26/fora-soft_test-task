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
    const { user, error } = addUser({ id: socket.id, username, roomname });
    const date = new Date();

    if (error) return cb(error);

    socket.emit('message', {
      user: 'chatbot',
      text: `${user.username}, welcome to ${user.roomname}`,
      date: `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`,
    });
    socket.broadcast
      .to(user.room)
      .emit('message', {
        user: 'chatbot',
        text: `${user.username}, has joined.`,
      });

    socket.join(user.room);

    cb();
  });

  socket.on('sendMessage', (message, cb) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', {
      user: user.username,
      text: message.text,
      date: message.date,
    });

    cb();
  });

  socket.on('disconnect', () => {
    console.log('Connection had left :(');
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port: ${PORT}`));
