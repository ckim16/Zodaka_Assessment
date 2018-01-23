import axios from 'axios';

import { SEARCH_TWEET } from './types';

const BASE_URL = 'http://localhost:3000';

export function searchTweets(key) {
  return function(dispatch) {
    axios.post(`${BASE_URL}/search/${key}`, { key }) // post request to server
    .then(response => {
      // sort the response array by 'created_at' property then make copies for first ten elements and the rest
      let arr = response.data.statuses.sort(function(a, b) {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      let firstTen = arr.slice(0, 10);
      let rest = arr.slice(10);
      // dispatch your response with type and payload (redux-thunk)
      dispatch({ 
        type: SEARCH_TWEET, 
        payload: { tweets: firstTen, rest, query: response.data.search_metadata.query } 
      });
    })
    .catch(err => console.log('search tweets err', err)); // error handling
  };
}