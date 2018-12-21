import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import { CELCIUS, FAHRENHEIT } from './constants';
import { toggleTempUnit } from './redux/actions';
import JournalListContainer from './JournalListContainer';
import { ToggleTemperatureUnit } from './Settings';

class SettingsContainer extends Component {
  componentDidMount() {
    if (this.props.tempUnit === undefined) {
      this.props.toggleTempUnit(this.props.tempUnit)
    }
  }

  handleClick = (e) => {
    switch (e.currentTarget.id) {
      case 'tempUnit':
        this.props.toggleTempUnit(this.props.tempUnit);
      default:
        return;
    }
  }

  render() {
    const component = this;
    return(
      <div>
        <ToggleTemperatureUnit
          tempUnit={component.props.tempUnit}
          handleClick={(e) => component.handleClick(e)}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tempUnit: state.globalVariablesReducer.tempUnit,
});

const mapDispatchToProps = (dispatch) => ({
  toggleTempUnit: (currentTempUnit) =>
    dispatch(toggleTempUnit(currentTempUnit)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
);
