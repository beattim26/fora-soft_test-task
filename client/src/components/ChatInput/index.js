import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Tooltip from '@material-ui/core/Tooltip';
import useStyles from './styles';

export default function ChatInput({ message, setMessage, sendMessage }) {
  const classes = useStyles();

  return (
    <form className={classes.form}>
      <TextField
        label="Write a message..."
        onChange={setMessage}
        value={message}
        fullWidth
        onKeyPress={(event) =>
          event.key === 'Enter' ? sendMessage(event) : null
        }
      />
      <Tooltip title="Send">
        <IconButton
          color="primary"
          aria-label="Send message"
          component="span"
          onClick={sendMessage}
        >
          <SendIcon />
        </IconButton>
      </Tooltip>
    </form>
  );
}
