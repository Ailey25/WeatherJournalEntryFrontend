import * as types from '../types';
import { BASE_URL, STATUS_CODE } from '../../constants';
import {
  authenticationHeader,
  getRequestOptions,
  getUserId,
  clearLocalStorage,
  formattedJournalsForFrontend,
  formattedJournalsForBackend
} from '../../utility';

export const postJournalList = (id, journalList) => {
  const formattedJournals = formattedJournalsForBackend(journalList);
  const requestOptions = {
    method: 'POST',
    headers: { ...authenticationHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      Id: id,
      Journals: formattedJournals,
    })
  };

  return async dispatch => {
    dispatch(setIsPosting(true));
     await fetch(BASE_URL + '/user/journal-list', requestOptions)
      .then(response => {
        //if (response.status === STATUS_CODE.UNAUTHORIZED) clearLocalStorage();
        if (response.ok) {
          dispatch(setOk(true));
        } else {
          dispatch(setOk(false));
        }
        return response.json();
      })
      .then(data => {
        dispatch(setMessage(data.message));
        dispatch(setIsPosting(false));
      })
      .catch((error) => {
        dispatch(setOk(false));
        dispatch(setMessage(error.message));
        dispatch(setIsPosting(false));
      })
  }
};

export const getJournalList = () => {
  return async dispatch => {
    dispatch(setIsLoading(true));
    await fetch(BASE_URL + '/user/journal-list/' + getUserId(), getRequestOptions())
      .then(response => {
        //if (response.status === STATUS_CODE.UNAUTHORIZED) clearLocalStorage();
        if (response.ok) {
          dispatch(setOk(true));
        } else {
          dispatch(setOk(false));
          throw new Error('Journal list can\'t be retrieved');
        }
        return response.json();
      })
      .then(data => {
        const formattedJournals = formattedJournalsForFrontend(data);
        dispatch(setJournalList(formattedJournals));
        dispatch(setMessage(data.message));
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        dispatch(setOk(false));
        dispatch(setMessage(error.message));
        dispatch(setIsLoading(false));
      })
  }
};

const setIsPosting = (bool) => ({
  type: types.SET_JOURNAL_LIST_IS_POSTING,
  isPosting: bool,
});

const setIsLoading = (bool) => ({
  type: types.SET_JOURNAL_LIST_IS_LOADING,
  isLoading: bool,
});

const setOk = (ok) => ({
  type: types.SET_JOURNAL_LIST_OK,
  ok,
});

export const setMessage = (message = '') => ({
  type: types.SET_JOURNAL_LIST_MESSAGE,
  message,
});

const setJournalList = (journals) => {
  return {
  type: types.SET_JOURNAL_LIST,
  journalList: journals,
}};
