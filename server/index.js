const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 3002;
const router = require('./router');

const { addUser, removeUser, getUser, getUsers } = require('./users');

app.use(router);
app.use(cors());

io.on('connection', (socket) => {
  socket.on('chat', ({ userName, roomName }, cb) => {
    if (!roomName) return cb(socket.id); // if it's a new room - return id for new room name
    const { user, error } = addUser({ id: socket.id, userName, roomName }); // add new user
    const date = new Date();

    if (error) return cb(error); // return error in the callback if username used

    socket.emit('message', {
      // sending a message in chat if somebody connected
      user: 'chatbot',
      text: `${user.userName}, welcome!`,
      date: `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`,
    });
    socket.broadcast.to(user.room).emit('message', {
      user: 'chatbot',
      text: `${user.userName}, has joined.`,
      date: `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`,
    });

    socket.join(user.room);

    io.to(user.room).emit('roomData', {
      // get users in the room
      roomName: user.roomName,
      users: getUsers(user.roomName),
    });

    socket.broadcast.to(user.room).emit('roomData', {
      // get users in the room
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

    cb();
  });

  socket.on('disconnect', () => {
    const date = new Date();
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('roomData', {
        // get users in the room
        roomName: user.roomName,
        users: getUsers(user.roomName),
      });

      io.to(user.room).emit('message', {
        // sending a message in chat if somebody disconnected
        user: 'chatbot',
        text: `${user.userName} has left.`,
        date: `${date.getHours()}:${String(date.getMinutes()).padStart(
          2,
          '0'
        )}`,
      });
    }
  });
});

server.listen(PORT, () => console.log(`Server has started on port: ${PORT}`));
