import { combineReducers } from 'redux';
import {
  userStateReducer,
  userSettingsReducer,
  journalListReducer,
  weatherStampReducer,
  journalReducer,
} from './app/home/redux/reducers';

const rootReducer = combineReducers({
  userStateReducer,
  userSettingsReducer,
  journalListReducer,
  weatherStampReducer,
  journalReducer,
});

export default rootReducer;
