import { combineReducers } from 'redux';
import { tweets } from './tweets_reducer';

const rootReducers = combineReducers({
  tweets
});

export default rootReducers;