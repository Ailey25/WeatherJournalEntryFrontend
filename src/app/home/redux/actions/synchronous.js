import * as types from '../types';
import { CELCIUS, FAHRENHEIT } from '../../constants';

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

// journal list
export const addJournal = (journalList, journal) => {
  let newJournalList = [...journalList, journal];
  return {
    type: types.SET_JOURNAL_LIST,
    journalList: newJournalList
  }
};

export const editJournal = (journalList, journalToEdit) => {
  let index = journalList.findIndex(j => j.id === journalToEdit.id);
  if (index !== -1) {
    let newJournalList = [
      ...journalList.slice(0, index), journalToEdit, ...journalList.slice(index+1)
    ];
    return {
      type: types.SET_JOURNAL_LIST,
      journalList: newJournalList
    }
  } else {
    return {
      type: types.SET_JOURNAL_LIST,
      journalList
    }
  }
};

export const deleteJournal = (journalList, journalIdToDelete) => {
  let index = journalList.findIndex(j => j.id === journalIdToDelete);
  if (index !== -1) {
    let newJournalList = [...journalList.slice(0, index), ...journalList.slice(index+1)];
    return {
      type: types.SET_JOURNAL_LIST,
      journalList: newJournalList
    }
  } else {
    return {
      type: types.SET_JOURNAL_LIST,
      journalList
    }
  }
};
