import axios from 'axios';

import { SEARCH_TWEET } from './types';

const BASE_URL = 'http://localhost:3000';

export function searchTweets(key) {
  return function(dispatch) {
    axios.post(`${BASE_URL}/search/${key}`, { key }) // post request to server
    .then(response => {
      // dispatch your response with type and payload (redux-thunk)
      dispatch({ 
        type: SEARCH_TWEET, 
        payload: { tweets: response.data.statuses, query: response.data.search_metadata.query } 
      });
    })
    .catch(err => console.log('search tweets err', err)); // error handling
  };
}