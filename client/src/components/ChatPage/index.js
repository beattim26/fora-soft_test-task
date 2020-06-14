import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import Container from '@material-ui/core/Container';
import ChatInput from '../ChatInput/';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ChatMessages from '../ChatMessages/';
import CloseIcon from '@material-ui/icons/Close';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ModalUsername from '../ModalUsername/';
import ModalOnlineUsers from '../ModalOnlineUsers/';
import useStyles from './styles';

let socket;

export default function Chat({ location }) {
  const classes = useStyles();
  const connection = 'https://fora-soft-onlinechat.herokuapp.com/';
  const [userName, setUserName] = useState(localStorage.getItem('username'));
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState({ text: '', date: '' });
  const [messages, setMessages] = useState([]);
  const [isModalUserOpen, setIsModalUserOpen] = useState(false);
  const [isModalOnlineOpen, setIsModalOnlineOpen] = useState(false);
  const history = useHistory();

  const handleInput = (event) => {
    const { value } = event.target;

    setMessage({ ...message, text: value });
  };

  const handleClose = () => {
    socket.disconnect();
    history.push('/');
  };

  const handleSeeOnline = () => {
    socket.on('roomData', ({ users }) => {
      // get users in the room
      setUsers(users);
    });
    setIsModalOnlineOpen(!isModalOnlineOpen);
  };

  useEffect(() => {
    socket = io(connection);
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      // get users in the room
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    const roomName = queryString.parse(location.search).roomname; // get room name from query string

    if (userName) {
      socket.emit('chat', { userName, roomName }, () => {});
    } else {
      setIsModalUserOpen(true); // open popup with the form for new users
    }
  }, [connection, location.search, userName]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      const date = new Date();
      const messageToSend = message;

      messageToSend.date = `${date.getHours()}:${String(
        date.getMinutes()
      ).padStart(2, '0')}`;
      socket.emit('sendMessage', messageToSend, () =>
        setMessage({ text: '', date: '' })
      );
    }
  };

  return !isModalUserOpen ? (
    <Container component="main" maxWidth="sm">
      <Card variant="outlined" className={classes.card}>
        <CardHeader
          avatar={
            <Tooltip title="Click to see who is online now">
              <IconButton
                className={classes.moreIcon}
                onClick={handleSeeOnline}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          }
          action={
            <Tooltip title="Leave">
              <IconButton className={classes.closeIcon} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          }
          className={classes.cardHeader}
        />
        <ChatMessages messages={messages} usermame={userName} />
        <ChatInput
          message={message.text}
          setMessage={handleInput}
          sendMessage={sendMessage}
        />
      </Card>
      <ModalOnlineUsers
        open={isModalOnlineOpen}
        setOpen={handleSeeOnline}
        users={users}
      />
    </Container>
  ) : (
    <ModalUsername
      open={isModalUserOpen}
      setOpen={setIsModalUserOpen}
      setUserName={setUserName}
    />
  );
}
