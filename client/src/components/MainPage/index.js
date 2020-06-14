import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ChatIcon from '@material-ui/icons/Chat';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MaterialLInk from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { checkName } from '../../scripts/validation';
import useStyles from './styles';

let socket;

function Developed() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Developed by '}
      <MaterialLInk href="https://github.com/beattim26">beattim26</MaterialLInk>
    </Typography>
  );
}

export default function MainPage() {
  const classes = useStyles();
  const history = useHistory();
  const connection = 'https://fora-soft-onlinechat.herokuapp.com/';
  const [userName, setUserName] = useState('');
  const [isValidName, setisValidName] = useState(false);

  const handleInput = (event) => {
    const { value } = event.target;

    setisValidName(!checkName(value)); // validation for inputs
    setUserName(value); // set new values from inputs
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (isValidName) return; // check if something wrong with the name

    localStorage.setItem('username', userName); // set username
    socket = io(connection);
    socket.emit('chat', { userName }, (id) => {
      history.push(`/chat?roomname=${id}`); // redirect to the room
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ChatIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create your chat room
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            error={isValidName}
            helperText={
              isValidName
                ? 'Please, write something else.'
                : 'Enter the name for your new chat room.'
            }
            required
            fullWidth
            label="Your name"
            onChange={handleInput}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            type="submit"
            disabled={!userName || isValidName}
          >
            Create chat
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Developed />
      </Box>
    </Container>
  );
}
