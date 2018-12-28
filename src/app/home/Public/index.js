import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AppDescription from './AppDescription/index';
import LoginContainer from '../Login/index';
import LogoutContainer from '../Logout/index';
import { BUTTON } from '../constants';

class PublicContainer extends Component {

  displayLoginLogoutButton = () => {
    if (this.props.isLoggedIn) {
      return (<LogoutContainer />);
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        {this.displayLoginLogoutButton()}
        <ul>
          <li><Link to="/public">Description</Link></li>
          <li><Link to="/private">Private</Link></li>
        </ul>
        <AppDescription />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.userInfoReducer.isLoggedIn,
});

export default withRouter(
  connect(mapStateToProps, null)(PublicContainer)
);
