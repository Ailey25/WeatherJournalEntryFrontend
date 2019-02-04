import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Route, withRouter } from 'react-router-dom';

import SettingsContainer from './Settings/index';
import ProfileContainer from './Profile/index';
import AccountContainer from './Account/index';
import { setMessage } from '../../redux/actions/userSettings';
import { APP_URL } from '../../Routes/constants';

import { UserInfoStyle, StyledLink } from './styles';

class UserInfoContainer extends Component {
  componentDidMount() {
    this.props.resetMessage();
  }

  displayMessage = () => {
    if (this.props.message !== '') {
      if (this.props.ok === true) {
        return <label>Success: {this.props.message}</label>
      } else if (this.props.ok === false) {
        return <label>Failed: {this.props.message}</label>
      }
    }
  }

  render() {
    const component = this;
    return(
      <UserInfoStyle>
        <StyledLink to={APP_URL.SETTINGS_TAB + '/settings'}>Settings</StyledLink>
        <StyledLink to={APP_URL.SETTINGS_TAB + '/profile'}>Profile</StyledLink>
        <StyledLink to={APP_URL.SETTINGS_TAB + '/account'}>Account</StyledLink>
        {this.displayMessage()}
        <Route exact path={APP_URL.SETTINGS_TAB} render={() => (
          <SettingsContainer />
        )} />
        <Route path={APP_URL.SETTINGS_TAB + '/settings'} render={() => (
          <SettingsContainer />
        )} />
        <Route path={APP_URL.SETTINGS_TAB + '/profile'} render={() => (
          <ProfileContainer />
        )} />
        <Route path={APP_URL.SETTINGS_TAB + '/account'} render={() => (
          <AccountContainer />
        )} />
      </UserInfoStyle>
    );
  }
}

const mapStateToProps = (state) => ({
  ok: state.userSettingsReducer.ok,
  message: state.userSettingsReducer.message,
});

const mapDispatchToProps = (dispatch) => ({
  resetMessage: () =>
    dispatch(setMessage()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserInfoContainer)
);
