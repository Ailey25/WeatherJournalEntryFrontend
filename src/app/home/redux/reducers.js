import types from './types';

// Initial States
const journalListInitialState = {
  journalList: [],
}
const weatherStampReducer = {
  weatherObject: {},
  main: {},
  weather: {},
}
const journalEntryReducer = {
  journalEntry: {},
  callType: '',
  callParams: [],
  statusCode: '',
  message: '',
}

// Reducers
const journalDataListReducer = (state = journalListInitialState, action) => {
  switch(action.type) {
    case types.ADD_TO_JOURNAL_ENTRY_LIST:
      return {
        journalList: [...state.journalList, action.journalEntry]
      };
    case types.EDIT_JOURNAL_ENTRY_LIST:
      return {
        journalList: [
          ...this.state.journalList.slice(0, index),
          action.journalObject,
          ...this.state.journalList.slice(index+1)
        ]
      };
    default:
      return state;
  }
}

const weatherStampReducer = (state = weatherStampReducer, action) => {
  switch(action.type) {
    case types.SET_WEATHER_OBJECT:
      return {
        ...state,
        weatherObject: {
          cityId: action.weatherObject.cityId,
          cityName: action.weatherObject.cityName,
        },
      }
    case types.SET_MAIN:
      return {
        ...state,
        main: {
          temp: action.main.temp,
        },
      }
    case types.SET_WEATHER:
      return {
        ...state,
        weather: {
          description: action.weather.description,
        },
      }
    default:
      return state;
  }
}

const journalEntryReducer = (status=journalEntryReducer, action) => {
  switch(action.type) {
    case types.SET_API_CALL_TYPE:
      return {
        ...state,
        callType: action.callType,
      }
    case types.SET_API_CALL_PARAMS:
      return {
        ...state,
        callParans: action.callParans,
      }
    case types.SET_HTTP_STATUS_CODE:
      return {
        ...state,
        statusCode: action.statusCode,
      }
    case types.SET_MESSAGE:
      return {
        ...state,
        message: action.message,
      }
    default:
      return state,
  }
}

export default {
  journalDataListReducer,
  weatherStampReducer,
  journalEntryReducer,
}
