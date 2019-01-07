import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import AppDescription from './AppDescription/index';
import LoginContainer from '../Login/index';
import UserStateButtonContainer from '../UserStateButton/index';
import { BUTTON } from '../constants';

class PublicContainer extends Component {
  render() {
    return (
      <div>
        <UserStateButtonContainer />
        <ul>
          <li><Link to="/public">Description</Link></li>
          <li><Link to="/private">Private</Link></li>
        </ul>
        <AppDescription />
      </div>
    );
  }
}

export default PublicContainer;
