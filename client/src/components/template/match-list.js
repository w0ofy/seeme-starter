import React, { Component } from 'react';
import { Link } from 'react-router';
const cookie = require('react-cookie');

const MatchList = React.createClass({

  renderList() {
    const user = cookie.load('user')
    console.log(user);
    if (user !== undefined) {
      return  [<div className="match-list-container">
        <div className="match">
          <Link to="#">react</Link> |
          <Link to="#">chat</Link>
          <div className="image" />
        </div>
        <div className="match">
          <Link to="#">react</Link> |
          <Link to="#">chat</Link>
          <div className="image" />
        </div>
        <div className="match">
          <Link to="#">react</Link> |
          <Link to="#">chat</Link>
          <div className="image" />
        </div>
        <div className="match">
          <Link to="#">react</Link> |
          <Link to="#">chat</Link>
          <div className="image" />
        </div>
      </div>]
    } else {
      return [<div className="empty" />]
    } 
  },
  
  render: function() {
    return (
      <div>
     {this.renderList()}
     </div>
    );
  }
})

module.exports = MatchList;