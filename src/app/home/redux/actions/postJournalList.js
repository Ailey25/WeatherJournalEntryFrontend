import * as types from '../types';
import { BASE_URL } from '../../constants';
import {
  authenticationHeader,
  /*logout,*/
  formatJournalsForBackend
} from '../../utility';

export const postJournalList = (id, journalList) => {
  const formattedJournals = formatJournalsForBackend(journalList);
  const requestOptions = {
    method: 'POST',
    headers: { ...authenticationHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      Id: id,
      Journals: formattedJournals,
    })
  };

  return async dispatch => {
    dispatch(journalListIsPosting(true));
     await fetch(BASE_URL + '/user/journal-list', requestOptions)
      .then(response => {
        if (response.status === 401) {
          logout();
        }
        return response.json()
      })
      .then(data => {
        dispatch(setMessageObject({ ok: data.ok, message: data.message }));
        dispatch(journalListIsPosting(false));
      })
      .catch((error) => {
        dispatch(setMessageObject({ ok: false, message: error.message }));
        dispatch(journalListIsPosting(false));
      })
  }
};

const journalListIsPosting = (bool) => ({
  type: types.JOURNAL_LIST_IS_POSTING,
  isPosting: bool
});

export const setMessageObject = ({ ok, message = '' }) => {
	return {
	  type: types.JOURNAL_LIST_STATUS,
		ok,
		message
	}
};
