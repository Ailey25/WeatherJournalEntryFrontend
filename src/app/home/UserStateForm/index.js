import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LoginForm from './LoginForm/index';
import RegisterForm from './RegisterForm/index';
import {
  login,
  register,
  setMessage,
} from '../redux/actions/userState';
import {
  BASE_URL,
  USERNAME,
  FIRSTNAME,
  LASTNAME,
  PASSWORD
} from '../constants';
import { APP_URL } from '../Routes/constants';

import { UserStateForm } from './styles';

class UserStateFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstname: '',
      lastname: '',
      password: '',
    }
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
        console.log('Register/login form handleChange: id ' +
                    e.currentTarget.id + ' not recognized');
        break;
    }
  }

  handleLoginSubmit = async (e) => {
    e.preventDefault();

  	await this.props.login(this.state.username, this.state.password);

    // if logged in successfully, redirect to private page
    if (this.props.ok) {
      this.props.history.push(APP_URL.JOURNALS_TAB);
    }
  }

  handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      password: this.state.password,
    };
    await this.props.register(user);

    // if registered successfully, log in
    if (this.props.ok) {
      await this.props.login(user.username, user.password);
    }

    // if logged in successfully, redirect to private page
    if (this.props.ok) {
      this.props.history.push(APP_URL.JOURNALS_TAB);
    }
  }

  displayForm = () => {
  	const component = this;
  	if (this.props.location.pathname === APP_URL.LOGIN) {
  		return(
  			<LoginForm
  				username={component.state.username}
  				password={component.state.password}
  				handleSubmit={(e) => component.handleLoginSubmit(e)}
  				handleChange={(e) => component.handleChange(e)}
  			/>
  		);
  	} else if (this.props.location.pathname === APP_URL.REGISTER) {
  		return(
  			<RegisterForm
  				username={component.state.username}
  				firstname={component.state.firstname}
  				lastname={component.state.lastname}
  				password={component.state.password}
  				handleSubmit={(e) => component.handleRegisterSubmit(e)}
  				handleChange={(e) => component.handleChange(e)}
  			/>
  		);
  	} else {
  		return <label>Form path not recognized</label>
  	}
  }

  displayMessage = () => {
    if (this.props.isAuthenticating) {
      return <label>Validating information...</label>
    }
    if (this.props.message !== '') {
      if (this.props.ok === true) {
        return <label>Success: {this.props.message}</label>
      } else if (this.props.ok === false) {
        return <label>Failed: {this.props.message}</label>
      }
    }
  }

  render() {
  	return (
      <div className="columnCenter">
    		<UserStateForm>
    			{this.displayForm()}
        </UserStateForm>
        <div className="rowCenter">
          {this.displayMessage()}
        </div>
  		</div>
  	);
  }
}

const mapStateToProps = (state) => ({
  isAuthenticating: state.userStateReducer.isAuthenticating,
  ok: state.userStateReducer.ok,
  message: state.userStateReducer.message,
});

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) =>
    dispatch(login(username, password)),
  register: (user) =>
    dispatch(register(user)),
  resetMessage: () =>
    dispatch(setMessage()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserStateFormContainer)
);
