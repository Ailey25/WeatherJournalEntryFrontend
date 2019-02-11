import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { isUserLoggedIn, clearLocalStorage } from '../utility';
import LogoutButton from './LogoutButton/index';
import RegisterButton from './RegisterButton/index';
import { APP_URL } from '../Routes/constants';

class UserStateButtonContainer extends Component {
  handleClick = (e) => {
    switch(e.currentTarget.id) {
      case 'logout':
        clearLocalStorage();
        this.props.history.push(APP_URL.HOME_TAB);
        return;
      case 'register':
        this.props.history.push(APP_URL.REGISTER);
        return;
      default:
        return;
    }
  }

  toggleUserStateButton = () => {
    const component = this;
    if (isUserLoggedIn()) {
      return (
        <LogoutButton handleClick={(e) => component.handleClick(e)} />
      );
    } else {
      return (
        <RegisterButton handleClick={(e) => component.handleClick(e)} />
      );
    }
  }

  render() {
    return (
      <div>
        {this.toggleUserStateButton()}
      </div>
    )
  }
}

export default withRouter(UserStateButtonContainer);
