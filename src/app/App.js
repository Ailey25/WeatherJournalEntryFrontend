import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import './App.css';
import JournalListContainer from './home/JournalList/index';
import LoginContainer from './home/Login/index';
import PublicContainer from './home/Public/index';
import PrivateRoute from './home/Routes/PrivateRoute/index';
import { FORM } from './home/constants';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={PublicContainer} />
        <Route path="/login" component={LoginContainer} />
        <PrivateRoute path="/private" component={JournalListContainer} />
      </div>
    );
  }
}

export default hot(module)(App);
