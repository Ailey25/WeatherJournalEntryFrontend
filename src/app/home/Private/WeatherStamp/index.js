import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import 'babel-polyfill';

import { WeatherStamp } from './WeatherStamp/index';
import { getWeatherData, setMessage } from  '../../redux/actions/weatherData';
import {
  EDIT,
  CELCIUS,
  BASE_URL
} from '../../constants'
import { getUserId } from '../../utility';

class WeatherStampContainer extends Component {
  async componentDidMount() {
    this.props.resetMessage();
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
    cityId: state.weatherReducer.weatherObject.cityId,
    cityName: state.weatherReducer.weatherObject.cityName,
  },
  main: {
    temp: state.weatherReducer.main.temp,
  },
  weather: state.weatherReducer.weather,
  isLoading: state.weatherReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getWeatherData: (id) =>
    dispatch(getWeatherData(id)),
  resetMessage: () =>
    dispatch(setMessage()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WeatherStampContainer)
);
