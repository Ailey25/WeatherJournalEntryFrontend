import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import Settings from './Settings/index';
import { toggleTempUnit } from '../../redux/actions/actions';
import { getUserId } from '../../utility';
import { CELCIUS, FAHRENHEIT } from '../../constants';

class SettingsContainer extends Component {

  componentDidMount() {
    // if (this.props.tempUnit === undefined) {
    //   this.props.toggleTempUnit(this.props.tempUnit)
    // }
  }

  handleTempUnitToggle = (e) => {
    //this.props.toggleTempUnit(this.props.tempUnit);
  }

  handleSettingsPost = async (e) => {
    if (getUserId()) {
      let settings = {
        UserId: getUserId(),
        TempUnit: 'F' //this.props.settings.tempUnit
      }
      console.log('settings post: ' + settings.UserId + ' ' + settings.TempUnit);
      //await postSettings();
    } else {
      console.log('Settings: user not recognized');
    }
  }

  render() {
    const component = this;
    return(
      <div>
        <Settings
          tempUnit={'C'}//component.props.settings.tempUnit}
          handleTempUnitToggle={(e) => component.handleTempUnitToggle(e)}
          handleSettingsPost={(e) => component.handleSettingsPost(e)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.settingsReducer.settings,
});

const mapDispatchToProps = (dispatch) => ({
  toggleTempUnit: (currentTempUnit) =>
    dispatch(toggleTempUnit(currentTempUnit)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
);
