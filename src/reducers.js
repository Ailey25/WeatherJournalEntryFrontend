import { combineReducers } from 'redux';
import {
  globalVariablesReducer,
  journalListReducer,
  weatherStampReducer,
  journalReducer,
} from './app/home/redux/reducers';

const rootReducer = combineReducers({
  globalVariablesReducer,
  journalListReducer,
  weatherStampReducer,
  journalReducer,
});

export default rootReducer;
