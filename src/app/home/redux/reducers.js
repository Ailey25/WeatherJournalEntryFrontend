import * as types from './types';
import { CELCIUS } from '../constants';

// Initial States
const userInfoInitialState = {
  isLoggedIn: false,
};

const globalVariablesInitialState = {
  tempUnit: CELCIUS,
};

const journalListInitialState = {
  journalList: [],
}
const weatherStampInitialState = {
  weatherObject: {},
  main: {},
  weather: [],
  isLoading: false,
}
const journalInitialState = {
  isPosting: false,
  response: {
    ok: false,
  },
  error: {
    status: '',
    message: '',
  }
}

export const userInfoReducer = (state = userInfoInitialState, action) => {
  switch(action.type) {
    case types.SET_IS_LOGGED_IN:
      return {
        isLoggedIn: action.isLoggedIn,
      };
    default:
      return state;
  }
};

export const globalVariablesReducer = (state = globalVariablesInitialState, action) => {
  switch(action.type) {
    case types.TOGGLE_TEMP_UNIT:
      return {
        tempUnit: action.tempUnit,
      };
    default:
      return state;
  }
};

export const journalListReducer = (state = journalListInitialState, action) => {
  switch(action.type) {
    case types.ADD_TO_JOURNAL_LIST:
      return {
        journalList: [...state.journalList, action.journalEntry]
      };
    case types.EDIT_JOURNAL_LIST:
      return {
        journalList: [
          ...state.journalList.slice(0, action.index),
          action.journalEntry,
          ...state.journalList.slice(action.index+1)
        ]
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
    case types.WEATHER_OBJECT_SUCCESS:
      return {
        ...state,
        weatherObject: {
          cityId: action.weatherObject.cityId,
          cityName: action.weatherObject.cityName,
        },
      };
    case types.MAIN_SUCCESS:
      return {
        ...state,
        main: {
          temp: action.main.temp,
        },
      };
    case types.WEATHER_SUCCESS:
      return {
        ...state,
        weather: action.weather,
      };
    case types.WEATHER_STAMP_ERROR:
      return {
        ...state,
        error: action.error,
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
        response: {
          ok: false,
        },
        error: {
          status: action.error.status,
          message: action.error.message,
        }
      };
    case types.WEATHER_DATA_POST_SUCCESS:
     return {
       ...state,
       response: {
         ok: action.response.ok,
       },
     };
    default:
      return state;
  }
};
