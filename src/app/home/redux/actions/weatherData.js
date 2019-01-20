import * as types from '../types';
import {
  authenticationHeader,
  getRequestOptions,
  getUserId,
  isClearLocalStorageOnStatusCode,
  formattedWeatherObjectForFrontend,
  formattedMainForFrontend,
  formattedWeathersForFrontend,
} from '../../utility';
import {
  BASE_URL,
  STATUS_CODE,
  WEATHER_OBJECT,
  MAIN,
  WEATHER
} from '../../constants';

export const postWeatherData = (fetchUrl) => (
  async dispatch => {
    await dispatch(postWeatherObject(fetchUrl));
  }
);

export const getWeatherData = (id) => (
  async dispatch => {
    await dispatch(getWeatherObject(id, WEATHER_OBJECT));
    await dispatch(getWeatherObject(id, MAIN));
    await dispatch(getWeatherObject(id, WEATHER));
  }
);

const postWeatherObject = (fetchUrl) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authenticationHeader(), 'Content-Type': 'application/json' },
  };

  return async dispatch => {
    dispatch(setIsPosting(true));
    await fetch(fetchUrl, requestOptions)
      .then(response => {
        if (isClearLocalStorageOnStatusCode(response.status)) {
          throw new Error('Unauthorized');
        }
        if (response.ok) {
          dispatch(setOk(true));
        } else {
          dispatch(setOk(false));
        }
        return response.json();
      })
      .then(data => {
        dispatch(setWeatherObject(data)); // need cityId
        dispatch(setIsPosting(false));
      })
      .catch((error) => {
        dispatch(setOk(false));
        dispatch(setMessage(error.message));
        dispatch(setIsPosting(false));
      })
  }
};

const getWeatherObject = (id, objectType) => {
  let urlParam;
  switch(objectType) {
    case WEATHER_OBJECT:
      urlParam = '/weatherobject/';
      break;
    case MAIN:
      urlParam = '/main/';
      break;
    case WEATHER:
      urlParam = '/weather/';
      break;
    default:
      urlParam = '';
      break;
  }

  return async dispatch => {
    dispatch(setIsLoading(true));
    await fetch(BASE_URL + urlParam + id, getRequestOptions())
      .then(response => {
        if (isClearLocalStorageOnStatusCode(response.status)) {
          throw new Error('Unauthorized');
        }
        if (response.ok) {
          dispatch(setOk(true));
        } else {
          dispatch(setOk(false));
        }
        return response.json();
      })
      .then((data) => {
        if (data === null || urlParam === '') {
          throw new Error('Weather data can\'t be retrieved');
        }

        switch (objectType) {
          case WEATHER_OBJECT:
            let formattedWeatherObject = formattedWeatherObjectForFrontend(data);
            dispatch(setWeatherObject(formattedWeatherObject));
            break;
          case MAIN:
            let formattedMain = formattedMainForFrontend(data);
            dispatch(setMain(formattedMain));
            break;
          case WEATHER:
            let formattedWeathers= formattedWeathersForFrontend(data);
            dispatch(setWeather(formattedWeathers));
            break;
          default:
            dispatch(setOk(false));
            dispatch(setMessage('weather data: object type not recognized'));
            break;
          }

        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        dispatch(setOk(false));
        dispatch(setMessage(error.message));
        dispatch(setIsLoading(false));
      });
  }
};

const setIsPosting = (bool) => ({
  type: types.SET_WEATHER_OBJECT_IS_POSTING ,
  isPosting: bool,
});

const setIsLoading = (bool) => ({
  type: types.SET_WEATHER_OBJECT_IS_LOADING ,
  isLoading: bool,
});

const setOk = (ok) => ({
  type: types.SET_WEATHER_OBJECT_OK ,
  ok,
});

export const setMessage = (message = '') => ({
  type: types.SET_WEATHER_OBJECT_MESSAGE ,
  message,
});

const setWeatherObject = (weatherObject) => ({
  type: types.SET_WEATHER_OBJECT,
  weatherObject,
});

const setMain = (main) => ({
  type: types.SET_MAIN,
  main,
});

const setWeather = (weather) => ({
  type: types.SET_WEATHER,
  weather,
});
