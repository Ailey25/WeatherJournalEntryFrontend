import * as types from './types';
import { CELCIUS } from '../constants';

// Initial States
const userStateInitialState = {
  isAuthenticating: false,
  ok: false,
  message: '',
};

const userSettingsInitialState = {
  isPosting: false,
  isLoading: false,
  tempUnit: CELCIUS,
  firstname: '',
  lastname: '',
  ok: false,
  message: '',
};

const journalListInitialState = {
  journalList: [],
  isPosting: false,
  isLoading: false,
  ok: false,
  message: '',
}
const weatherInitialState = {
  isPosting: false,
  isLoading: false,
  ok: false,
  message: '',
  weatherObject: {
    cityId: '',
    cityName: ''
  },
  main: {},
  weather: [],
};

export const userStateReducer = (state = userStateInitialState, action) => {
  switch(action.type) {
    case types.SET_USER_IS_AUTHENTICATING:
      return {
         ...state,
         isAuthenticating: action.isAuthenticating,
      };
    case types.SET_USER_STATE_OK:
      return {
        ...state,
        ok: action.ok,
      };
    case types.SET_USER_STATE_MESSAGE:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
   }
}

export const userSettingsReducer = (state = userSettingsInitialState, action) => {
  switch(action.type) {
    case types.SET_USER_SETTINGS_IS_POSTING:
      return {
        ...state,
        isPosting: action.isPosting,
      };
    case types.SET_USER_SETTINGS_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SET_USER_SETTINGS_OK:
      return {
        ...state,
        ok: action.ok,
      };
    case types.SET_USER_SETTINGS_MESSAGE:
      return {
        ...state,
        message: action.message,
      };
    case types.TOGGLE_TEMP_UNIT:
      return {
        ...state,
        tempUnit: action.tempUnit,
      };
    case types.SET_SETTINGS:
      return {
        ...state,
        tempUnit: action.tempUnit,
      };
    case types.SET_PROFILE:
      return {
        ...state,
        firstname: action.firstname,
        lastname: action.lastname,
      };
    default:
      return state;
  }
};

export const journalListReducer = (state = journalListInitialState, action) => {
  switch(action.type) {
    case types.SET_JOURNAL_LIST_IS_POSTING:
      return {
        ...state,
        isPosting: action.isPosting,
      }
    case types.SET_JOURNAL_LIST_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SET_JOURNAL_LIST:
      return {
        ...state,
        journalList: action.journalList,
      };
    case types.SET_JOURNAL_LIST_OK:
      return {
        ...state,
        ok: action.ok,
      };
    case types.SET_JOURNAL_LIST_MESSAGE:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
};

export const weatherReducer  = (state = weatherInitialState, action) => {
  switch(action.type) {
    case types.SET_WEATHER_OBJECT_IS_POSTING:
      return {
        ...state,
        isPosting: action.isPosting,
      }
    case types.SET_WEATHER_OBJECT_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SET_WEATHER_OBJECT:
      return {
        ...state,
        weatherObject: {
          cityId: action.weatherObject.cityId,
          cityName: action.weatherObject.cityName,
        },
      };
    case types.SET_MAIN:
      return {
        ...state,
        main: {
          temp: action.main.temp,
        },
      };
    case types.SET_WEATHER:
      return {
        ...state,
        weather: action.weather,
      };
    case types.SET_WEATHER_OBJECT_OK:
      return {
        ...state,
        ok: action.ok,
      };
    case types.SET_WEATHER_OBJECT_MESSAGE:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
};
