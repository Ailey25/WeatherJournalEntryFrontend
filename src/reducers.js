import { combineReducers } from 'redux';
import {
  journalListReducer,
  weatherStampReducer,
  journalReducer,
} from './app/home/redux/reducers';

const rootReducer = combineReducers({
  journalListReducer,
  weatherStampReducer,
  journalReducer,
});

export default rootReducer;
