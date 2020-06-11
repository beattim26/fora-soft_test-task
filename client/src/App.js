import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './components/MainPage/';
import ChatPage from './components/ChatPage/';

export default function App () {
  return (
    <Router>
      <Route path="/" exact component={MainPage} />
      <Route path="/chat" component={ChatPage} />
    </Router>
  );
}
