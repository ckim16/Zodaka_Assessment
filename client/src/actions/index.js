import axios from 'axios';

import { SEARCH_TWEET } from './types';

const BASE_URL = 'http://localhost:3000';

export function searchTweets(key) {
  return function(dispatch) {
    axios.post(`${BASE_URL}/search/${key}`, { key })
    .then(response => {
      dispatch({ 
        type: SEARCH_TWEET, 
        payload: { tweets: response.data.statuses, query: response.data.search_metadata.query } 
      });
    })
    .catch(err => console.log('search tweets err', err));
  };
}