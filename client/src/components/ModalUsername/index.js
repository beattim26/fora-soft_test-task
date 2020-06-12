import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useStyles from './styles';

export default function ModalUsername({ open, setOpen, setUserName }) {
  const classes = useStyles();
  const history = useHistory();
  const [newUserName, setNewUserName] = useState('');

  const handleInput = (event) => {
    const { value } = event.target;

    setNewUserName(value);
  };

  const handleClose = () => {
    history.push('/');
  };

  const handleButton = () => {
    localStorage.setItem('username', newUserName);
    setUserName(newUserName);
    setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <TextField
            multiline
            label="Enter your name"
            placeholder="Rick Sanchez"
            value={newUserName}
            onChange={handleInput}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.submitButton}
            onClick={handleButton}
          >
            Join to chat
          </Button>
        </div>
      </Fade>
    </Modal>
  );
}
