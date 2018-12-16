import { combineReducers } from 'redux';
import {
  journalDataListReducer,
  weatherStampReducer,
  journalEntryReducer,
} from './app/components/redux/reducers.js';

const rootReducer = combineReducers({
  journalDataListReducer,
  weatherStampReducer,
  journalEntryReducer,
});

export default rootReducer;
