import * as types from './types';
import { CELCIUS, FAHRENHEIT } from '../constants';

export const toggleTempUnit = (currentTempUnit) => {
  if (currentTempUnit === FAHRENHEIT) {
    return {
      type: types.TOGGLE_TEMP_UNIT,
      tempUnit: CELCIUS
    }
  } else {
    return {
      type: types.TOGGLE_TEMP_UNIT,
      tempUnit: FAHRENHEIT
    }
  }
};

// weather journal list
export const addToJournalList = (journalEntry) => ({
  type: types.ADD_TO_JOURNAL_LIST,
  journalEntry
});

export const editJournalList = (journalEntry, index) => ({
  type: types.EDIT_JOURNAL_LIST,
  journalEntry,
  index
});

// weather journal
export const setJournalMode = (mode) => ({
  type: types.JOURNAL_MODE,
  mode
});
