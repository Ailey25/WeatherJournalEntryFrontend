import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { isUserLoggedIn, logout } from '../utility';
import LogoutButton from './LogoutButton/index';
import RegisterButton from './RegisterButton/index';

class UserStateButtonContainer extends Component {
  handleClick = (e) => {
    switch(e.currentTarget.id) {
      case 'logout':
        logout();
        this.props.history.push("/");
        return;
      case 'register':
        this.props.history.push("/register");
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