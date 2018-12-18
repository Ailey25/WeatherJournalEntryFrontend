import * as types from './types';

// weather journal list
export const addToJournalList = (journalEntry) => ({
  type: types.ADD_TO_JOURNAL_LIST,
  journalEntry
});

export const editJournalList = (journalEntry) => ({
  type: types.EDIT_JOURNAL_LIST,
  journalEntry
});

// weather journal
export const setJournalMode = (mode) => ({
  type: types.JOURNAL_MODE,
  mode
});

// export const setAPICallType = (callType) => ({
//   type: types.SET_API_CALL_TYPE,
//   callType
// });
//
// export const setAPICallParams = (callParams) => ({
//   type: types.SET_API_CALL_PARAMS,
//   callParams
// });
//
