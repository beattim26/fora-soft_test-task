import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Message/';
import useStyles from './styles';

export default function Messages({ messages, usermame }) {
  const classes = useStyles();

  return (
    <ScrollToBottom className={classes.container}>
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={usermame} />
        </div>
      ))}
    </ScrollToBottom>
  );
}
