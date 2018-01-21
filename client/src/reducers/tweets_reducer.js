import { SEARCH_TWEET } from '../actions/types';

export function tweets(state=null, actions) {
  if (actions.type === SEARCH_TWEET) {
    return actions.payload;
  }
  return state;
}