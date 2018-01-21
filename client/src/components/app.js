import React, { Component } from 'react';

import SearchBox from '../containers/search_box';
import Tweets from '../containers/tweets';

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBox/>
        <Tweets/>
      </div>
    );
  }
}