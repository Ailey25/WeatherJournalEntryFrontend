import * as types from '../types';
import { BASE_URL } from '../../constants';
import {
  authenticationHeader,
  /*logout,*/
  getUserId,
  formatJournalsForFrontend,
} from '../../utility';

export const getJournalList = () => {
  const requestOptions = {
    method: 'GET',
    headers: { ...authenticationHeader(), 'Content-Type': 'application/json' }
  };

  return async dispatch => {
    dispatch(journalListIsLoading(true));
    await fetch(BASE_URL + '/user/journal-list/' + getUserId(), requestOptions)
      .then(response => {
        if (response.status === 401) {
          logout();
        }
        return response.json()
      })
      .then(data => {
        if (data.ok) {
          const formattedJournals = formatJournalsForFrontend(data.journalList);
          dispatch(journalListGetSuccess(formattedJournals));
        }
        dispatch(setMessageObject({ ok: data.ok, message: data.message }))
        dispatch(journalListIsLoading(false));
      })
      .catch((error) => {
        dispatch(setMessageObject({ ok: false, message: error.message }));
        dispatch(journalListIsLoading(false));
      })
  }
};

const journalListIsLoading = (bool) => ({
  type: types.JOURNAL_LIST_IS_LOADING,
  isLoading: bool
});

const journalListGetSuccess = (journals) => ({
  type: types.JOURNAL_LIST_GET_SUCCESS,
  journalList: journals
});

export const setMessageObject = ({ ok, message = '' }) => {
	return {
	  type: types.JOURNAL_LIST_STATUS,
		ok,
		message
	}
};
