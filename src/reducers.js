import { combineReducers } from 'redux';
import {
  userInfoReducer,
  settingsReducer,
  journalListReducer,
  weatherStampReducer,
  journalReducer,
} from './app/home/redux/reducers';

const rootReducer = combineReducers({
  userInfoReducer,
  settingsReducer,
  journalListReducer,
  weatherStampReducer,
  journalReducer,
});

export default rootReducer;
