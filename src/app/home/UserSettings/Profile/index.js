import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import UpdateProfile from './UpdateProfile/index';
import { getUserId } from '../../utility';
import { FIRSTNAME, LASTNAME } from '../../constants';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
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

    // updateProfile(this.state.firstname, this.state.lastname);
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

});

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(
  connect(null, null)(ProfileContainer)
);
