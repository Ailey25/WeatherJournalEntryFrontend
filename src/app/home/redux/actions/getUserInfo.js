import * as types from '../types';
import { BASE_URL } from '../../constants';

export const getUserInfo = (id) => {
  async dispatch => {
    await dispatch(getJournalList(id));
    await dispatch(getTempUnit(id));
  }
}

const getJournalList = (id) => {
  return async dispatch => {
    dispatch(journalListIsLoading(true));
    await fetch(BASE_URL + 'user/journal-list')
      .then(response => response.json())
      .then((data) => {
        dispatch(journalListGetSuccess(data));
        dispatch(journalListIsLoading(false));
      })
      .catch((error) => {
        dispatch(setErrorObject(error.message));
        dispatch(journalListIsLoading(false));
      });
  }
};

const getTempUnit = (id) => {
  return dispatch => {
    dispatch(userInfoIsLoading(true));
    await fetch(BASE_URL + 'user/temp-unit')
      .then(response => response.json())
      .then((data) => {
        dispatch(tempUnitGetSuccess(data));
        dispatch(userInfoIsLoading(false));
      })
      .catch((error) => {
        dispatch(setErrorObject(error.message));
        dispatch(userInfoIsLoading(false));
      });
  }
};

const journalListIsLoading = (bool) => ({
  type: types.JOURNAL_LIST_IS_LOADING,
  isLoading: bool
});

const tempUnitIsLoading = (bool) => ({
  type: types.TEMP_UNIT_IS_LOADING,
  isLoading: bool
});

const journalListGetSuccess = (response) => ({
  type: types.JOURNAL_LIST_GET_SUCCESS,
  journalList: response
});

const tempUnitGetSuccess = (response) => ({
  type: types.TEMP_UNIT_GET_SUCCESS,
  tempUnit: response
});

const setErrorObject = (error) => ({
  type: types.USER_INFO_ERROR,
  error: {
    status: error.status,
    message: error.message,
  }
});
