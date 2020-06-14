const users = [];

const addUser = ({ id, userName, roomName }) => {
  const user = { id, userName, roomName }; // add new user in users array

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const user = users.findIndex((user) => user.id === id);

  if (user !== -1) return users.splice(user, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsers = (room) => users.filter((user) => user.roomName === room);

module.exports = { addUser, removeUser, getUser, getUsers };
