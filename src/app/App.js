import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import './App.css';
import JournalListContainer from './home/JournalList/index';
import UserStateFormContainer from './home/UserStateForm/index'
import PublicContainer from './home/Public/index';
import PrivateRoute from './home/Routes/PrivateRoute/index';
import { FORM } from './home/constants';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={PublicContainer} />
        <Route path="/login" render={(props) =>
          <UserStateFormContainer key={props.match.params} {...props} />
        } />
        <Route path="/register" render={(props) =>
          <UserStateFormContainer key={props.match.params} {...props} />
        } />
        <PrivateRoute path="/private" component={JournalListContainer} />
      </div>
    );
  }
}

export default hot(module)(App);
