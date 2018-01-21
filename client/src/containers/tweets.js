import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TwitterTweetEmbed } from 'react-twitter-embed';

class Tweets extends Component {
  constructor(props) {
    super(props);
  }

  searchTerm() {
    if (this.props.tweets) {
      const { query } = this.props.tweets
      return (
        <h2>Tweets for "{this.props.tweets.query}"</h2>
      );
    }
  }

  renderTweet() {
    if (this.props.tweets) {
      return this.props.tweets.tweets.map((t, idx) => {
        return (
          <TwitterTweetEmbed
            key={idx}
            tweetId={t.id_str}
          />
        );
      })
    }
  }

  render() {
    return (
      <div className="tweets">
        {this.searchTerm()}
        {this.renderTweet()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tweets: state.tweets
  };
}

export default connect(mapStateToProps)(Tweets);