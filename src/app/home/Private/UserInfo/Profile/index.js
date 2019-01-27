import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import UpdateProfile from './UpdateProfile/index';
import {
  getProfile,
  postProfile,
  setMessage
} from '../../../redux/actions/userSettings';
import { getUserId } from '../../../utility';
import { FIRSTNAME, LASTNAME } from '../../../constants';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
    }
  }

  async componentDidMount() {
    this.props.resetMessage();

    await this.props.getProfile();
    if (this.props.ok) {
      this.setState({
        firstname: this.props.firstname,
        lastname: this.props.lastname,
      });
    }
  }

  handleProfileChange = (e) => {
    switch(e.currentTarget.id) {
      case FIRSTNAME:
        this.setState({ firstname: e.currentTarget.value });
        return;
      case LASTNAME:
        this.setState({ lastname: e.currentTarget.value });
        return;
      default:
        console.log('handleProfileChange: id ' +
                    e.currentTarget.id + ' not recognized');
        return;
    }
  }

  handleProfilePost = async (e) => {
    e.preventDefault();

    const user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname
    };

    await this.props.postProfile(user);
  }

  render() {
    const component = this;
    return(
      <div>
        <UpdateProfile
          firstname={component.state.firstname}
          lastname={component.state.lastname}
          handleProfilePost={(e) => component.handleProfilePost(e)}
          handleProfileChange={(e) => component.handleProfileChange(e)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ok: state.userSettingsReducer.ok,
  firstname: state.userSettingsReducer.firstname,
  lastname: state.userSettingsReducer.lastname,
});

const mapDispatchToProps = (dispatch) => ({
  getProfile: () =>
    dispatch(getProfile()),
  postProfile: (user) =>
    dispatch(postProfile(user)),
  resetMessage: () =>
    dispatch(setMessage()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
);
