import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ChatIcon from '@material-ui/icons/Chat';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MaterialLInk from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import useStyles from './styles';

function Developed() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Developed by '}
      <MaterialLInk href='https://github.com/beattim26'>beattim26</MaterialLInk>
    </Typography>
  );
}

export default function MainPage() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    userName: '',
    roomName: '',
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLink = (event) => {
    if (!formData.userName || !formData.roomName) {
      event.preventDefault()
      return;
    }

    localStorage.setItem('username', formData.userName);
  }

  return (
    <Container component='main' maxWidth='sm'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ChatIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Create your chat room
        </Typography>
        <div className={classes.form}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Room name'
            name='roomName'
            autoFocus
            onChange={handleInput}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Your name'
            name='userName'
            onChange={handleInput}
          />
          <Link
            className={classes.link}
            to={`/chat?roomname=${formData.roomName}`}
            onClick={handleLink}
          >
            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Create chat
            </Button>
          </Link>
        </div>
      </div>
      <Box mt={8}>
        <Developed />
      </Box>
    </Container>
  );
}
