import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import UpdatePassword from './UpdatePassword/index';
import UpdateUsername from './UpdateUsername/index';
import DeleteAccount from './DeleteAccount/index';
import { getUserId } from '../../utility';
import { OLD_PASSWORD, NEW_PASSWORD, CONFIRM_PASSWORD } from '../../constants';

class AccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      username: '',
    }
  }

  handlePasswordChange = (e) => {
    switch(e.currentTarget.id) {
      case OLD_PASSWORD:
        this.setState({ oldPassword: e.currentTarget.value });
        return;
      case NEW_PASSWORD:
        this.setState({ newPassword: e.currentTarget.value });
        return;
      case CONFIRM_PASSWORD:
        this.setState({ confirmPassword: e.currentTarget.value });
        return;
      default:
        console.log('handlePasswordChange: id ' +
                    e.currentTarget.id + ' not recognized');
        return;
    }
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.currentTarget.value });
  }

  handlePasswordPost = async (e) => {
    e.preventDefault();

    if (this.state.newPassword === this.state.confirmPassword) {
      // updatePassword(oldPassword, newPassword)
    } else {
      // set message object to be password doesn't match
    }
  }

  handleUsernamePost = async (e) => {
    e.preventDefault();
    // updateUsername(oldUsername, this.state.newUsername)
  }

  handleDeleteAccountPost= async (e) => {
    //tell backend to delete account
  }

  render() {
    const component = this;
    return(
      <div>
        <UpdatePassword
          oldPassword={component.state.oldPassword}
          newPassword={component.state.newPassword}
          confirmPassword={component.state.confirmPassword}
          handlePasswordPost={(e) => component.handlePasswordPost(e)}
          handlePasswordChange={(e) => component.handlePasswordChange(e)}
        />
        <UpdateUsername
          username={component.state.username}
          handleUsernamePost={(e) => component.handleUsernamePost(e)}
          handleUsernameChange={(e) => component.handleUsernameChange(e)}
        />
        <DeleteAccount
          handleDeleteAccountPost={(e) => component.handleDeleteAccountPost(e)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(
  connect(null, null)(AccountContainer)
);
