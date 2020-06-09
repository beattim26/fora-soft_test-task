import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

export default function Chat({ location }) {
  const endPoint = 'localhost:3001';

  useEffect(() => {
    const { username, roomname } = queryString.parse(location.search);

    socket = io(endPoint);
    socket.emit('chat', { username, roomname });
  }, [location]);

  return <h1>Chat</h1>;
}
