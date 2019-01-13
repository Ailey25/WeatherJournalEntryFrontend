import * as types from '../types';
import { BASE_URL, STATUS_CODE_UNAUTHORIZED } from '../../constants';
import { authenticationHeader /*,logout*/ } from '../../utility';

export const fetchWeatherStampInfo = (id) => (
  async dispatch => {
    await dispatch(fetchWeatherObject(id));
    await dispatch(fetchMain(id));
    await dispatch(fetchWeather(id));
  }
);

const requestOptions = {
  method: 'GET',
  headers: { ...authenticationHeader(), 'Content-Type': 'application/json' },
};

const fetchWeatherObject = (id) => {
  return async dispatch => {
    dispatch(weatherStampIsLoading(true));
    await fetch(BASE_URL + '/weatherobject/' + id, requestOptions)
      .then(response => {
        // let auth = authenticationHeader();
        // let requestHeader = requestOptions.headers;
        // console.log('break here');
        // console.log('go to settings, refresh page, and come back again')
        if (response.status === 401) {
          logout();
          throw new Error(401);
        }
        return response.json()
      })
      .then((data) => {
        dispatch(weatherObjectSuccess(data));
        dispatch(weatherStampIsLoading(false));
      })
      .catch((error) => {
        dispatch(weatherStampError({ message: error.message }));
        dispatch(weatherStampIsLoading(false));
      });
  }
};

const fetchMain = (id) => {
  return async dispatch => {
    dispatch(weatherStampIsLoading(true));
    await fetch(BASE_URL + '/main/' + id, requestOptions)
      .then(response => {
        if (response.status === 401) {
          logout();
          throw new Error(401);
        }
        return response.json()
      })
      .then((data) => {
        dispatch(mainSuccess(data));
        dispatch(weatherStampIsLoading(false));
      })
      .catch((error) => {
        dispatch(weatherStampError({ message: error.message }));
        dispatch(weatherStampIsLoading(false));
      });
  }
};

const fetchWeather = (id) => {
  return async dispatch => {
    dispatch(weatherStampIsLoading(true));
    await fetch(BASE_URL + '/weather/' + id, requestOptions)
      .then(response => {
        if (response.status === 401) {
          logout();
          throw new Error(401);
        }
        return response.json()
      })
      .then((data) => {
        dispatch(weatherSuccess(data));
        dispatch(weatherStampIsLoading(false));
      })
      .catch((error) => {
        dispatch(weatherStampError({ message: error.message }));
        dispatch(weatherStampIsLoading(false));
      });
  }
};

const weatherStampIsLoading = (bool) => ({
  type: types.WEATHER_STAMP_IS_LOADING,
  isLoading: bool
});

export const weatherStampError = ({ status = '', message = '' }) => ({
  type: types.WEATHER_STAMP_ERROR,
  status,
  message
});

const weatherObjectSuccess = (data) => ({
  type: types.WEATHER_OBJECT_GET_SUCCESS,
  weatherObject: {
    cityId: data.id,
    cityName: data.name,
  }
});

const mainSuccess = (data) => ({
  type: types.MAIN_GET_SUCCESS,
  main: {
    temp: data.temp,
  }
});

const weatherSuccess = (data) => ({
  type: types.WEATHER_GET_SUCCESS,
  weather: data,
});
