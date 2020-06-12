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
import { Typography } from '@material-ui/core';
import useStyles from './styles';

let socket;

export default function Chat({ location }) {
  const classes = useStyles();
  const connection = 'localhost:3001';
  const [userName, setUserName] = useState(localStorage.getItem('username'));
  const [roomName, setRoomName] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState({ text: '', date: '' });
  const [messages, setMessages] = useState([]);
  const [isModalUserOpen, setIsModalUserOpen] = useState(false);
  const [isModalOnlineOpen, setIsModalOnlineOpen] = useState(false);
  const history = useHistory();

  const modalOnlineUsers = !isModalOnlineOpen ? (
    <ModalOnlineUsers open={isModalOnlineOpen} setOpen={setIsModalOnlineOpen} />
  ) : null;

  const handleInput = (event) => {
    const { value } = event.target;

    setMessage({ ...message, text: value });
  };

  const handleClose = () => {
    socket.off();
    localStorage.removeItem('username');
    history.push('/');
  };

  const handleSeeOnline = () => {
    setIsModalOnlineOpen(true);
  };

  useEffect(() => {
    socket = io(connection);
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    const roomName = queryString.parse(location.search).roomname;
    setRoomName(roomName);

    if (userName) {
      socket.emit('chat', { userName, roomName }, (err) => {
        if (err === 'Set your name') {
          console.log(userName);
        }
      });
    } else {
      setIsModalUserOpen(true);
    }
  }, [connection, location.search, userName]);

  const sendMessage = (event) => {
    console.log(users);
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
      <Typography variant="h4" className={classes.title}>
        Chat: {roomName}
      </Typography>
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
      {modalOnlineUsers}
    </Container>
  ) : (
    <ModalUsername
      open={isModalUserOpen}
      setOpen={setIsModalUserOpen}
      setUserName={setUserName}
    />
  );
}
