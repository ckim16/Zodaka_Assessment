import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class Tweets extends Component {
  constructor(props) {
    super(props);

    this.state = { option: '', showMore: false };
  }

  _onOptionChange(option) {
    // callback from radio button component
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
    // radio button component for rendering all tweets for EN tweets only
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
      // sort the array in terms of 'created_at' then slice it down to length of 10
      const firstTenTweets = this.props.tweets.tweets.sort(function(a, b) {
        return new Date(b.created_at) - new Date(a.created_at);
      }).slice(0, 10);

      if (this.state.option === 'EN') { // if a user wants to see only Engligh tweets
        let enTweets = firstTenTweets.map(t => {
          if (t.lang === 'en') {
            return (
              <TwitterTweetEmbed
                key={t.id}
                tweetId={t.id_str}
              />
            );
          }
        });
        return (
          <CSSTransitionGroup
            transitionName="tweet"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={700} 
            transitionLeaveTimeout={500}
          >
            {enTweets}
          </CSSTransitionGroup>
        );
      } else { // render first ten tweets
        let allTweets = firstTenTweets.map(t => {
          return (
            <TwitterTweetEmbed
              key={t.id}
              tweetId={t.id_str}
            />
          );
        });
        return (
          <CSSTransitionGroup
            transitionName="tweet"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={700} 
            transitionLeaveTimeout={500}
          >
            {allTweets}
          </CSSTransitionGroup>
        );
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