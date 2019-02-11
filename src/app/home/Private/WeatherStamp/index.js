import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import { WeatherStamp } from './WeatherStamp/index';
import { getWeatherData, setMessage } from  '../../redux/actions/weatherData';
import { getUserId } from '../../utility';
import { APP_URL } from '../../Routes/constants';

export class WeatherStampContainer extends Component {
  async componentDidMount() {
    this.props.resetMessage();
    if (!this.props.hide) {
      await this.props.getWeatherData(this.props.id);
    }
  }

  componentDidUpdate() {
    if (!(getUserId())) {
      this.props.history.push(APP_URL.HOME_TAB);
    }
  }

  render() {
    if (this.props.hide) return null;

    const component = this;
    return (
      <WeatherStamp
        hide={component.props.hide}
        isLoading={component.props.isLoading}
        cityName={
          component.props.weatherObject
            ? component.props.weatherObject.cityName
            : ''
        }
        unit={component.props.tempUnit}
        temp={
          component.props.main
            ? component.props.main.temp
            : ''
        }
        weathers={component.props.weather}
      />
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
