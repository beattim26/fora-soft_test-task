import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../ChatMessage';
import useStyles from './styles';

export default function Messages({ messages, usermame }) {
  const classes = useStyles();

  return (
    <ScrollToBottom className={classes.container} followButtonClassName="followButton">
      {messages.map((message, i) => (
        <Message message={message} name={usermame} key={i} />
      ))}
    </ScrollToBottom>
  );
}
