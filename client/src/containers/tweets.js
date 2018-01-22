import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TwitterTweetEmbed } from 'react-twitter-embed'; // library that provides twitter card style with a twitter id #
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'; // library for CSS transition in React

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
    if (this.props.tweets) { // only render this term when tweets object is defined
      const { query } = this.props.tweets
      if (this.props.tweets.tweets.length === 0) { // if there is no tweet about the search term
        return (<h2 className="noTweets">No Tweets for "{query}"</h2>);
      } 
      return (
        <h2>Tweets for "{query}"</h2>
      );
    }
  }

  searchOptions() {
    // radio button component for rendering all tweets for EN tweets only
    if (this.props.tweets) { // only render options when tweets object is defined
      if (this.props.tweets.tweets.length === 0) { // if there is no tweet about the search term
        return null;
      } 
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
    if (this.props.tweets) { // only render tweets when tweets object is defined
      // sort the array by created time then slice it down to length of 10
      let firstTen = this.props.tweets.tweets;
      let { rest } = this.props.tweets;
      let displayArr = this.state.showMore ? firstTen.concat(rest) : firstTen;
      if (this.state.option === 'EN') { // if a user wants to see only Engligh tweets
        let enArr = displayArr.filter(arr => { // loop through the entire tweets array and filter if lang property has value of 'en'
          return arr.lang === 'en';
        });
        let enTweets = enArr.map(t => { // loop through the filtered array to create twitter card
          return (
            <TwitterTweetEmbed
              key={t.id}
              tweetId={t.id_str}
            />
          );
        });
        this.len = enTweets.length;
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
        let allTweets = displayArr.map(t => { // loop throught the entire tweets array and create twitter card
          return (
            <TwitterTweetEmbed
              key={t.id}
              tweetId={t.id_str}
            />
          );
        });
        this.len = allTweets.length;
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

  _onClickLoadMore() {
    this.setState({ showMore: !this.state.showMore });
  }

  loadMore() {
    if (this.props.tweets) {
      if (this.len < 10) {
        return null;
      } else if (!this.state.showMore) {
        return (<span className="more" onClick={this._onClickLoadMore.bind(this)}>Show more..</span>)
      } else if (this.state.showMore) {
        return (<span className="more" onClick={this._onClickLoadMore.bind(this)}>Show less..</span>)
      }
    }
  }

  render() {
    return (
      <div className="tweets">
        {this.searchTerm()}
        {this.searchOptions()}
        {this.renderTweet()}
        {this.loadMore()}
      </div>
    );
  }
}

// utility function which helps your component get updated state
function mapStateToProps(state) {
  return {
    tweets: state.tweets
  };
}

// connect every redux methods with your component
export default connect(mapStateToProps)(Tweets);