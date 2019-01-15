import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import Settings from './Settings/index';
import {
  getSettings,
  postSettings,
  setMessage
} from '../../redux/actions/userSettings';
import { toggleTempUnit } from '../../redux/actions/actions';
import { getUserId } from '../../utility';
import { CELCIUS, FAHRENHEIT } from '../../constants';

class UserInfoContainer extends Component {
  async componentDidMount() {
    await this.props.getSettings();
  }

  handleTempUnitToggle = (e) => {
    this.props.toggleTempUnit(this.props.tempUnit);
  }

  handleSettingsPost = async (e) => {
    if (getUserId()) {
      await this.props.postSettings({ tempUnit: this.props.tempUnit });
    } else {
      //logout
    }
  }

  render() {
    const component = this;
    return(
      <div>
        <Settings
          tempUnit={component.props.tempUnit}
          handleTempUnitToggle={(e) => component.handleTempUnitToggle(e)}
          handleSettingsPost={(e) => component.handleSettingsPost(e)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tempUnit: state.userSettingsReducer.tempUnit,
});

const mapDispatchToProps = (dispatch) => ({
  getSettings: () =>
    dispatch(getSettings()),
  postSettings: (settings) =>
    dispatch(postSettings(settings)),
  toggleTempUnit: (currentTempUnit) =>
    dispatch(toggleTempUnit(currentTempUnit)),
  resetMessage: () =>
    dispatch(setMessage()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserInfoContainer)
);
