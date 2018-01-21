import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { searchTweets } from '../actions/index';

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = { key: '' };
  }

  _onChangeKey(e) {
    this.setState({ key: e.target.value });
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.searchTweets(this.state.key);
    this.setState({ key: '' });
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit.bind(this)}>
        <input
          placeholder="Find Tweets"
          value={this.state.key}
          onChange={this._onChangeKey.bind(this)}
        />
        <button type="submit">FIND</button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchTweets }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBox);