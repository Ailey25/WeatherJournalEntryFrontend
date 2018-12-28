import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setIsLoggedIn } from '../redux/actions';
import Logout from './Logout/index';

class LogoutContainer extends Component {
  handleClick = (e) => {
    this.props.setIsLoggedIn(false);
  }

  render() {
    const component = this;
    return <Logout handleClick={(e) => component.handleClick(e)} />
  }
}

const mapDispatchToProps = (dispatch) => ({
  setIsLoggedIn: (bool) =>
    dispatch(setIsLoggedIn(bool)),
});

export default withRouter(
  connect(null, mapDispatchToProps)(LogoutContainer)
);
