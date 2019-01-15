import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import 'babel-polyfill';

import { WeatherStamp } from './WeatherStamp/index';
import {
  fetchWeatherStampInfo,
  weatherStampError
} from  '../redux/actions/getWeatherAPI';
import {
  EDIT,
  CELCIUS,
  BASE_URL
} from '../constants'
import { getUserId } from '../utility';

class WeatherStampContainer extends Component {
  async componentDidMount() {
    this.props.resetWeatherStampError();
    if (this.props.mode === EDIT) {
      await this.props.getWeatherData(this.props.id);
    }
  }

  componentDidUpdate() {
    if (!(getUserId())) {
      this.props.history.push("/");
    }
  }

  render() {
    const component = this;
    return (
      <WeatherStamp
        mode={component.props.mode}
        isLoading={component.props.isLoading}
        cityName={component.props.weatherObject.cityName}
        unit={component.props.tempUnit}
        temp={component.props.main.temp}
        weather={component.props.weather} />
    );
  }
}

const mapStateToProps = (state) => ({
  tempUnit: state.userSettingsReducer.tempUnit,
  weatherObject: {
    cityName: state.weatherStampReducer.weatherObject.cityName,
    cityId: state.weatherStampReducer.weatherObject.cityId,
  },
  main: {
    temp: state.weatherStampReducer.main.temp,
  },
  weather: state.weatherStampReducer.weather,
  isLoading: state.weatherStampReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getWeatherData: (id) =>
    dispatch(fetchWeatherStampInfo(id)),
  resetWeatherStampError: () =>
    dispatch(weatherStampError({})),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WeatherStampContainer)
);
