import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; // library that connects your action event with dispatch

import { searchTweets } from '../actions/index';

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = { key: '' };
  }

  _onChangeKey(e) { // callback for input change
    this.setState({ key: e.target.value });
  }

  _handleSubmit(e) { // callback for form submit
    e.preventDefault(); // prevent the page from refreshing
    this.props.searchTweets(this.state.key);
    this.setState({ key: '' });
  }

  render() {
    return (
      <form className="input-group mb-3" onSubmit={this._handleSubmit.bind(this)}>
        <input
          className="form-control"
          placeholder="Find Tweets about.."
          value={this.state.key}
          onChange={this._onChangeKey.bind(this)}
        />
        <div className="input-group-append">
          <button type="button" className="btn btn-primary">
            FIND{' '} 
            <i className="fa fa-twitter" aria-hidden="true"></i>
          </button>
        </div>
      </form>
    );
  }
}

// utility which will help your component to fire an action event (dispatching action which may cause change of application state)
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchTweets }, dispatch);
}

// connect every redux methods with your component
export default connect(null, mapDispatchToProps)(SearchBox); 