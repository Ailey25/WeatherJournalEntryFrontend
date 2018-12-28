import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';

import { setIsLoggedIn } from '../redux/actions';
import LoginForm from './LoginForm/index';

class LoginContainer extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.setIsLoggedIn(true);
  }

  render() {
    const component = this;
    return (
      <LoginForm handleSubmit={(e) => component.handleSubmit(e)} />
    );
  }
}

const mapStateToProps = (state) => ({ // not used yet
  isLoggedIn: state.userInfoReducer.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  setIsLoggedIn: (bool) =>
    dispatch(setIsLoggedIn(bool)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
);
