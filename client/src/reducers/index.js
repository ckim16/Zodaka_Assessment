import { combineReducers } from 'redux'; // component that turns multiple reducing functions to a single reducing funciton that can be passed to createStore()
import { tweets } from './tweets_reducer';

const rootReducers = combineReducers({
  tweets
});

export default rootReducers;