import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom';

import SettingsContainer from './Settings/index';
import ProfileContainer from './Profile/index';
import AccountContainer from './Account/index';

class UserSettingsContainer extends Component {
  componentDidMount() {
    //this.props.resetMessage();
  }

  handleClick = (e) => {
    switch(e.currentTarget.id) {
      case 'settings':
        this.props.history.push('/private/user-settings/settings');
        return;
      case 'profile':
        this.props.history.push('/private/user-settings/profile');
        return;
      case 'account':
        this.props.history.push('/private/user-settings/account');
        return;
      default:
        console.log('settings container id ' + e.currentTarget.id + ' not recognized');
        return;
    }
  }

  displayMessage = () => {
    return null; //remove this
    if (this.props.ok === undefined) {
      return null;
    } else if (this.props.ok === true) {
      return <label>Success: {this.props.message}</label>
    } else if (this.props.ok === false) {
      return <label>Failed: {this.props.message}</label>
    }
  }

  render() {
    const component = this;
    return(
      <div>
        <div>
          <button id="settings" onClick={component.handleClick}>
            Settings
          </button>
          <button id="profile" onClick={component.handleClick}>
            Profile
          </button>
          <button id="account" onClick={component.handleClick}>
            Account
          </button>
        </div>
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
/*    <Route path ="/private/profile" render={() => (
      <Profile />
    )} />*/

const mapStateToProps = (state) => ({
  settings: state.settingsReducer.settings,
  ok: state.settingsReducer.ok,
  message: state.settingsReducer.message,
});

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserSettingsContainer)
);
