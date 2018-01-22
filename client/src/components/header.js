import React, { Component } from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this._onClickLinkedin = this._onClickLinkedin.bind(this);
    this._onClickGithub = this._onClickGithub.bind(this);
  }

  _onClickLinkedin() {
    window.open('https://www.linkedin.com/in/cheewoonkim');
  }

  _onClickGithub() {
    window.open('https://www.github.com/ckim16');
  }

  render() {
    return (
      <div className="jumbotron">
        <h1>Zodaka Technical Assignment</h1>
        <p>Zodaka Technical Assignment from Cheewoon Kim</p>      
        <div className="right">
          <label>Linkedin: <i className="fa fa-linkedin-square fa-2x" aria-hidden="true" onClick={this._onClickLinkedin}></i></label>
          <label>Github: <i className="fa fa-github-square fa-2x" aria-hidden="true" onClick={this._onClickGithub}></i></label>
        </div>
      </div>
    );
  }
}