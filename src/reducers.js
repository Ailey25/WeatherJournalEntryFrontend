import { combineReducers } from 'redux';
import {
  userInfoReducer,
  globalVariablesReducer,
  journalListReducer,
  weatherStampReducer,
  journalReducer,
} from './app/home/redux/reducers';

const rootReducer = combineReducers({
  userInfoReducer,
  globalVariablesReducer,
  journalListReducer,
  weatherStampReducer,
  journalReducer,
});

export default rootReducer;
