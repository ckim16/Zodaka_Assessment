import { SEARCH_TWEET } from '../actions/types';

export function tweets(state=null, actions) { // function that mutates state based on action type
  if (actions.type === SEARCH_TWEET) { // if action.type is SEARCH_TWEET then return actions.payload
    return actions.payload;
  }
  return state; //return initial state if actions.type is other than SEARCH_TWEET
}