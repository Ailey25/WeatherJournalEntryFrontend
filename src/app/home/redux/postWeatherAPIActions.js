import * as types from './types';
import { BASE_URL } from '../constants';

export const postWeatherData = (fetchUrl) => (
  async dispatch => {
    await dispatch(fetchWeatherDataPost(fetchUrl))
  }
);

const fetchWeatherDataPost = (fetchUrl) => {
  return async dispatch => {
    dispatch(weatherDataIsPosting(true));
    await fetch(fetchUrl, {method: 'POST'})
      .then(response => {
        if (response.ok) {
          dispatch(weatherDataPostSuccess(response));
        }
        dispatch(weatherDataIsPosting(false));
      })
      .catch((error) => {
        dispatch(setErrorObject(error));
        dispatch(weatherDataIsPosting(false));
      })
  }
};

const weatherDataIsPosting = (bool) => ({
  type: types.WEATHER_DATA_IS_POSTING,
  isPosting: bool
});

export const setErrorObject = (error) => ({
  type: types.WEATHER_DATA_ERROR,
  error: {
    status: error.status,
    message: error.message,
  }
});

const weatherDataPostSuccess = (response) => ({
  type: types.WEATHER_DATA_POST_SUCCESS,
  response
});
