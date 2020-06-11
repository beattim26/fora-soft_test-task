const users = [];

const addUser = ({ id, username, roomname }) => {
  const existingUser = users.find(
    (user) => user.room === roomname && user.name === username
  );

  // if (existingUser) return { error: 'Username is taken' };

  const user = { id, username, roomname };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const user = users.findIndex((user) => user.id === id);

  if (user !== -1) return users.splice(user, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsers = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsers };
