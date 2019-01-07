import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import 'babel-polyfill';

import { WeatherStamp } from './WeatherStamp/index';
import { fetchWeatherStampInfo } from  '../redux/actions/getWeatherAPI';
import { EDIT, CELCIUS, BASE_URL } from '../constants'

class WeatherStampContainer extends Component {
  async componentDidMount() {
    if (this.props.mode === EDIT) {
      await this.props.getWeatherData(this.props.id);
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
  tempUnit: state.globalVariablesReducer.tempUnit,
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
    dispatch(fetchWeatherStampInfo(id))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WeatherStampContainer)
);
