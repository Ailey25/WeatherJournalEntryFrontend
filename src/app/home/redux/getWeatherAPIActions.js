import * as types from './types';
import { BASE_URL } from '../constants';

export const fetchWeatherStampInfo = (id) => (
  async dispatch => {
    await dispatch(fetchWeatherObject(id));
    await dispatch(fetchMain(id));
    await dispatch(fetchWeather(id));
  }
);

const fetchWeatherObject = (id) => {
  return async dispatch => {
    dispatch(weatherStampIsLoading(true));
    await fetch(BASE_URL + '/weatherobject/' + id)
      .then(response => response.json())
      .then((data) => {
        dispatch(weatherObjectSuccess(data));
        dispatch(weatherStampIsLoading(false));
      })
      .catch((error) => {
        dispatch(weatherStampError(error.message));
        dispatch(weatherStampIsLoading(false));
      });
  }
}

const fetchMain = (id) => {
  return async dispatch => {
    dispatch(weatherStampIsLoading(true));
    await fetch(BASE_URL + '/main/' + id)
      .then(response => response.json())
      .then((data) => {
        dispatch(weatherStampIsLoading(false));
        dispatch(mainSuccess(data));
      })
      .catch((error) => {
        dispatch(weatherStampIsLoading(false));
        dispatch(weatherStampError(error.message));
      });
  }
}

const fetchWeather = (id) => {
  return async dispatch => {
    dispatch(weatherStampIsLoading(true));
    await fetch(BASE_URL + '/weather/' + id)
      .then(response => response.json())
      .then((data) => {
        dispatch(weatherStampIsLoading(false));
        dispatch(weatherSuccess(data));
      })
      .catch((error) => {
        dispatch(weatherStampIsLoading(false));
        dispatch(weatherStampError(error.message));
      });
  }
}

const weatherStampIsLoading = (bool) => ({
  type: types.WEATHER_STAMP_IS_LOADING,
  isLoading: bool
});

const weatherStampError = (error) => ({
  type: types.WEATHER_STAMP_ERROR,
  error
});

const weatherObjectSuccess = (data) => ({
  type: types.WEATHER_OBJECT_SUCCESS,
  weatherObject: {
    cityId: data.id,
    cityName: data.name,
  }
});

const mainSuccess = (data) => ({
  type: types.MAIN_SUCCESS,
  main: {
    temp: data.temp,
  }
});

const weatherSuccess = (data) => ({
  type: types.WEATHER_SUCCESS,
  weather: data,
});
