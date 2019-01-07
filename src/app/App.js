import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import './App.css';
import JournalListContainer from './home/JournalList/index';
import LoginContainer from './home/Login/index';
import RegisterContainer from './home/Register/index';
import PublicContainer from './home/Public/index';
import PrivateRoute from './home/Routes/PrivateRoute/index';
import { FORM } from './home/constants';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={PublicContainer} />
        <Route path="/login" render={(props) =>
          <LoginContainer key={props.match.params} {...props} />
        } />
        <Route path="/register" render={(props) =>
          <RegisterContainer key={props.match.params} {...props} />
        } />
        <PrivateRoute path="/private" component={JournalListContainer} />
      </div>
    );
  }
}

export default hot(module)(App);
