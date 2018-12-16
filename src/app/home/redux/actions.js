import types from './types.js';

const addToJournalEntryList = (journalEntry) => {
  type: types.ADD_TO_JOURNAL_ENTRY_LIST,
  journalEntry
}

const editJournalEntryList = (journalEntry) => {
  type: types.EDIT_JOURNAL_ENTRY_LIST,
  journalEntry
}

const setWeatherObject = (weatherObject) => {
  type: types.SET_WEATHER_OBJECT,
  weatherObject,
}

const setMain = (main) => {
  type: types.SET_MAIN,
  main,
}

const setWeather = (weather) => {
  type: types.SET_WEATHER,
  weather,
}

const setAPICallType = (callType) => {
  type: types.SET_API_CALL_TYPE,
  callType,
}

const setAPICallParams = (callParams) => {
  type: types.SET_API_CALL_PARAMS,
  callParams,
}

const setHTTPStatusCode = (statusCode) => {
  type: types.SET_HTTP_STATUS_CODE,
  statusCode,
}

const setMessage = (message) => {
  type: types.SET_MESSAGE,
  message,
}

export default {
  addToJournalEntryList,
  editJournalEntryList,
  setWeatherObject,
  setMain,
  setWeather,
  setAPICallType,
  setAPICallParams,
  setHTTPStatusCode,
  setMessage,
}
