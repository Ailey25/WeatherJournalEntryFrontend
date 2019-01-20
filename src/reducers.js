import { combineReducers } from 'redux';
import {
  userStateReducer,
  userSettingsReducer,
  journalListReducer,
  weatherReducer,
} from './app/home/redux/reducers';

const rootReducer = combineReducers({
  userStateReducer,
  userSettingsReducer,
  journalListReducer,
  weatherReducer,
});

export default rootReducer;
