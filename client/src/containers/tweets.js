import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TwitterTweetEmbed } from 'react-twitter-embed';

class Tweets extends Component {
  constructor(props) {
    super(props);

    this.state = { option: '' };
  }

  _onOptionChange(option) {
    this.setState({ option });
  }

  searchTerm() {
    if (this.props.tweets) {
      const { query } = this.props.tweets
      return (
        <h2>Tweets for "{this.props.tweets.query}"</h2>
      );
    }
  }

  searchOptions() {
    if (this.props.tweets) {
      let all_class = (this.state.option === 'EN') ? 'btn btn-secondary' : 'btn btn-secondary active';
      let en_class = (this.state.option === 'EN') ? 'btn btn-secondary active' : 'btn btn-secondary'; 
      return (
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className={all_class}>
            <input 
              type="radio"
              onClick={this._onOptionChange.bind(this, 'All')}
              autoComplete="off" 
              checked={this.state.option === 'All'}
            />All Tweets
          </label>
          <label className={en_class}>
            <input 
              type="radio"
              onClick={this._onOptionChange.bind(this, 'EN')} 
              autoComplete="off" 
              checked={this.state.option === 'EN'}
            />EN Tweets Only
          </label>
        </div>
      );
    }
  }

  renderTweet() {
    if (this.props.tweets) {
      if (this.state.option === 'EN') {
        return this.props.tweets.tweets.map((t, idx) => {
          if (t.lang === 'en') {
            return (
              <TwitterTweetEmbed
                key={idx}
                tweetId={t.id_str}
              />
            );
          }
        });
      } else {
        return this.props.tweets.tweets.map((t, idx) => {
          return (
            <TwitterTweetEmbed
              key={idx}
              tweetId={t.id_str}
            />
          );
        });
      }
    }
  }

  render() {
    return (
      <div className="tweets">
        {this.searchTerm()}
        {this.searchOptions()}
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