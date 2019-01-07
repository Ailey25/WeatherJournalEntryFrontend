import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LoginForm from './LoginForm/index';
import { USERNAME, PASSWORD } from '../constants';
import {
  login,
  setUserStatus
} from '../redux/actions/userService';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.resetMessage();
  }

  handleChange = (e) => {
    switch(e.currentTarget.id) {
      case USERNAME:
        this.setState({ username: e.currentTarget.value });
        break;
      case PASSWORD:
        this.setState({ password: e.currentTarget.value });
        break;
      default:
        console.log('Login form handleChange: id ' +
                    e.currentTarget.id + ' not recognized');
        break;
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    await this.props.login(this.state.username, this.state.password);

    // redirect to private page if logged in successfully
    if (this.props.userStatus !== undefined) {
      if (this.props.userStatus.status) this.props.history.push("/private");
    }
  }

  displayUserStatusMessage = () => {
    if (this.props.userStatus !== undefined) {
      return <label>{this.props.userStatus.message}</label>
    }
  }

  render() {
    const component = this;
    return (
      <div>
        <LoginForm
          username={component.state.username}
          password={component.state.password}
          handleSubmit={(e) => component.handleSubmit(e)}
          handleChange={(e) => component.handleChange(e)}
        />
        {this.displayUserStatusMessage()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  if (state.userInfoReducer.userStatus !== undefined) {
    return {
      userStatus: {
        status: state.userInfoReducer.userStatus.status,
        message: state.userInfoReducer.userStatus.message,
      }
    }
  }
};

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) =>
    dispatch(login(username, password)),
  resetMessage: () =>
    dispatch(setUserStatus({ status: true, message: '' })),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
);
