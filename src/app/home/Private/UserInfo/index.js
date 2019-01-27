import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Route, withRouter } from 'react-router-dom';

import SettingsContainer from './Settings/index';
import ProfileContainer from './Profile/index';
import AccountContainer from './Account/index';
import { setMessage } from '../../redux/actions/userSettings';

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
      <div>
        <ul>
          <li><Link to="/private/user-settings/settings">Settings</Link></li>
          <li><Link to="/private/user-settings/profile">Profile</Link></li>
          <li><Link to="/private/user-settings/account">Account</Link></li>
        </ul>
        {this.displayMessage()}
        <Route path ="/private/user-settings/settings" render={() => (
          <SettingsContainer />
        )} />
        <Route path ="/private/user-settings/profile" render={() => (
          <ProfileContainer />
        )} />
        <Route path ="/private/user-settings/account" render={() => (
          <AccountContainer />
        )} />
      </div>
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
