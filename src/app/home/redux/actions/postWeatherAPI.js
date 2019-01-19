import * as types from '../types';
import { BASE_URL } from '../../constants';
import { authenticationHeader } from '../../utility';

export const postWeatherData = (fetchUrl) => (
  async dispatch => {
    await dispatch(fetchWeatherDataPost(fetchUrl))
  }
);

const fetchWeatherDataPost = (fetchUrl) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authenticationHeader(), 'Content-Type': 'application/json' },
  };

  return async dispatch => {
    dispatch(weatherDataIsPosting(true));
    await fetch(fetchUrl, requestOptions)
      .then(response => {
        //f (response.status === 401) 
        return response.json()
      })
      .then(data => {
        if (data.ok) {
          dispatch(weatherDataPostSuccess(JSON.parse(data.weatherObjectStr)));
        }
        dispatch(weatherDataIsPosting(false));
      })
      .catch((error) => {
        dispatch(setErrorObject({ ok: false, message: error.message }));
        dispatch(weatherDataIsPosting(false));
      })
  }
};

const weatherDataIsPosting = (bool) => ({
  type: types.WEATHER_DATA_IS_POSTING,
  isPosting: bool
});

export const setErrorObject = ({ ok = false, message = '' }) => ({
  type: types.WEATHER_DATA_ERROR,
  ok,
  message,
});

const weatherDataPostSuccess = (weatherObject) => ({
  type: types.WEATHER_DATA_POST_SUCCESS,
  cityId: weatherObject.id
});
