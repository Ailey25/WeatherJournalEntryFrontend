import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import RegisterForm from './RegisterForm/index';
import { BASE_URL } from '../constants';
import {
  USERNAME,
  FIRSTNAME,
  LASTNAME,
  PASSWORD
} from '../constants';
import {
  registerUser,
  setUserStatus
} from '../redux/actions/userService';

class RegisterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstname: '',
      lastname: '',
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
      case FIRSTNAME:
        this.setState({ firstname: e.currentTarget.value });
        break;
      case LASTNAME:
        this.setState({ lastname: e.currentTarget.value });
        break;
      case PASSWORD:
        this.setState({ password: e.currentTarget.value });
        break;
      default:
        console.log('Register form handleChange: id ' +
                    e.currentTarget.id + ' not recognized');
        break;
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      password: this.state.password,
    };

    await this.props.registerUser(user);

    // redirect to private page if registers successfully
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
        <RegisterForm
          username={component.state.username}
          firstname={component.state.firstname}
          lastname={component.state.lastname}
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
  registerUser: (user) =>
    dispatch(registerUser(user)),
  resetMessage: () =>
    dispatch(setUserStatus({ status: true, message: '' })),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)
);
