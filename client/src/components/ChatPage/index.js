import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Container from '@material-ui/core/Container';
import ChatInput from '../ChatInput/';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import ChatMessages from '../ChatMessages/';
import useStyles from './styles';

let socket;

export default function Chat({ location }) {
  const classes = useStyles();
  const connection = 'localhost:3001';
  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState({ text: '', date: '' });
  const [messages, setMessages] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPopover = Boolean(anchorEl);
  const id = openPopover ? 'simple-popover' : undefined;

  const handleClickPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleInput = (event) => {
    const { value } = event.target;

    setMessage({ ...message, text: value });
  };

  useEffect(() => {
    const { username, roomname } = queryString.parse(location.search);

    socket = io(connection);

    setRoomName(roomname);
    setUserName(username);

    socket.emit('chat', { username, roomname }, (err) => {
      if (err) alert(err);
    });
  }, [connection, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('room', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      const date = new Date();
      const messageToSend = message;

      messageToSend.date = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
      socket.emit('sendMessage', messageToSend, () =>
        setMessage({ text: '', date: '' })
      );
    }
  };

  console.log(message, messages);

  return (
    <Container component="main" maxWidth="sm">
      <h1>{roomName}</h1>
      <Card variant="outlined" className={classes.card}>
        <CardHeader
          action={
            <IconButton
              aria-label="settings"
              onClick={handleClickPopover}
              className={classes.moreIcon}
            >
              <MoreVertIcon />
            </IconButton>
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
      <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>
          The content of the Popover.
        </Typography>
      </Popover>
    </Container>
  );
}
