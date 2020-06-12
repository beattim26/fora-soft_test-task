const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 3001;
const router = require('./router');

const { addUser, removeUser, getUser, getUsers } = require('./users');

app.use(router);
app.use(cors());

io.on('connection', (socket) => {
  socket.on('chat', ({ userName, roomName }, cb) => {
    const { user, error } = addUser({ id: socket.id, userName, roomName });
    const date = new Date();

    if (error) return cb(error);

    socket.emit('message', {
      user: 'chatbot',
      text: `${user.userName}, welcome to ${user.roomName}`,
      date: `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`,
    });
    socket.broadcast.to(user.room).emit('message', {
      user: 'chatbot',
      text: `${user.userName}, has joined.`,
      date: `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`,
    });

    socket.join(user.room);

    io.to(user.roomName).emit('roomData', {
      roomName: user.roomName,
      users: getUsers(user.roomName),
    });

    cb();
  });

  socket.on('sendMessage', (message, cb) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', {
      user: user.userName,
      text: message.text,
      date: message.date,
    });

    io.to(user.room).emit('roomData', {
      roomName: user.room,
      users: getUsers(user.roomName),
    });

    cb();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'chatbot',
        text: `${user.userName} has left.`,
      });
    }
  });
});

server.listen(PORT, () => console.log(`Server has started on port: ${PORT}`));
