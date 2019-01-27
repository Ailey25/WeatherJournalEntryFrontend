import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import UserStateButtonContainer from './home/UserStateButton/index';
import PrivateContainer from './home/Private/index';
import UserStateFormContainer from './home/UserStateForm/index'
import PublicContainer from './home/Public/index';
import PrivateRoute from './home/Routes/PrivateRoute/index';

class App extends Component {
  render() {
    return (
      <div>
        <UserStateButtonContainer />
        <Route path="/" component={PublicContainer} />
        <Route path="/login" render={(props) =>
          <UserStateFormContainer key={props.match.params} {...props} />
        } />
        <Route path="/register" render={(props) =>
          <UserStateFormContainer key={props.match.params} {...props} />
        } />
        <PrivateRoute path="/private/" component={PrivateContainer} />
      </div>
    );
  }
}

export default hot(module)(App);
