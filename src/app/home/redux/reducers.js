import * as types from './types';
import { CELCIUS } from '../constants';

// Initial States
const userInfoInitialState = {
  isAuthenticating: false,
  username: '',
  firstname: '',
  lastname: '',
  ok: false,
  message: '',
};

const settingsInitialState = {
  tempUnit: CELCIUS,
  isPosting: false,
  isLoading: false,
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
const weatherStampInitialState = {
  isLoading: false,
  status: '',
  message: '',
  weatherObject: {},
  main: {},
  weather: [],
}
const journalInitialState = {
  isPosting: false,
  cityId: '',
  ok: false,
  message: '',
}

export const userInfoReducer = (state = userInfoInitialState, action) => {
  switch(action.type) {
    case types.USER_IS_AUTHENTICATING:
      return {
         ...state,
         isAuthenticating: action.isAuthenticating,
      };
    case types.USER_GET_SUCCESS:
      return {
        ...state,
        username: action.username,
        firstname: action.username,
        lastname: action.lastname,
      };
    case types.USER_STATUS:
      return {
        ...state,
        ok: action.ok,
        message: action.message,
      };
    default:
      return state;
   }
};

export const settingsReducer = (state = settingsInitialState, action) => {
  switch(action.type) {
    case types.TOGGLE_TEMP_UNIT:
      return {
        ...state,
        tempUnit: action.tempUnit,
      };
    default:
      return state;
  }
};

export const journalListReducer = (state = journalListInitialState, action) => {
  switch(action.type) {
    case types.JOURNAL_LIST_GET_SUCCESS:
      return {
        ...state,
        journalList: action.journalList,
      };
    case types.JOURNAL_LIST_IS_POSTING:
      return {
        ...state,
        isPosting: action.isPosting,
      }
    case types.JOURNAL_LIST_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.ADD_TO_JOURNAL_LIST:
      return {
        ...state,
        journalList: [...state.journalList, action.journalEntry]
      };
    case types.EDIT_JOURNAL_LIST:
      return {
        ...state,
        journalList: [
          ...state.journalList.slice(0, action.index),
          action.journalEntry,
          ...state.journalList.slice(action.index+1)
        ]
      };
    case types.JOURNAL_LIST_STATUS:
      return {
        ...state,
        ok: action.status,
        message: action.message,
      };
    default:
      return state;
  }
};

export const weatherStampReducer = (state = weatherStampInitialState, action) => {
  switch(action.type) {
    case types.WEATHER_STAMP_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.WEATHER_OBJECT_GET_SUCCESS:
      return {
        ...state,
        weatherObject: {
          cityId: action.weatherObject.cityId,
          cityName: action.weatherObject.cityName,
        },
      };
    case types.MAIN_GET_SUCCESS:
      return {
        ...state,
        main: {
          temp: action.main.temp,
        },
      };
    case types.WEATHER_GET_SUCCESS:
      return {
        ...state,
        weather: action.weather,
      };
    case types.WEATHER_STAMP_ERROR:
      return {
        ...state,
        status: action.status,
        message: action.message,
      };
    default:
      return state;
  }
};

export const journalReducer = (state=journalInitialState, action) => {
  switch(action.type) {
    case types.WEATHER_DATA_IS_POSTING:
      return {
        ...state,
        isPosting: action.isPosting,
      };
    case types.WEATHER_DATA_ERROR:
      return {
        ...state,
        ok: action.ok,
        message: action.message,
      };
    case types.WEATHER_DATA_POST_SUCCESS:
     return {
       ...state,
       cityId: action.cityId,
       ok: true,
     };
    default:
      return state;
  }
};
