import React, { Component } from 'react';
import { Link } from 'react-router';
const cookie = require('react-cookie'),
      user = cookie.load('user');

const MatchList = React.createClass({

  renderList() {
    console.log(user);
    if (user !== undefined) {
      return  [<div className="match-list-container">
        <div className="match">
          <Link to="#chat">Vin</Link>
          <div className="image" />
        </div>
        <div className="match">
          <Link to="#chat">Ant</Link>
          <div className="image" />
        </div>
        <div className="match">
          <Link to="#chat">Mike</Link>
          <div className="image" />
        </div>
        <div className="match">
          <Link to="#">Franklin</Link>
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