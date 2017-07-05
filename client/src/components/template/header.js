import React, { Component } from 'react';
import { Link } from 'react-router';
import mui from 'material-ui';
import MdIconPack from 'react-icons/lib/md';
import MdPersonOutline from 'react-icons/lib/md/person-outline';
import MdTouchApp from 'react-icons/lib/md/touch-app';
import MdExitApp from 'react-icons/lib/md/exit-to-app';
import SwipeIcon from 'react-icons/lib/md/swipe-icon';
const HeaderLogin = require('../auth/header-login')
const cookie = require('react-cookie');
const axios = require('axios');

const Header = React.createClass({
  logoutUser() {
    let user = cookie.load('user');
    let emailQuery = { email: user.email };
    axios.put('http://localhost:3000/api/auth/logout', { emailQuery
    },
      { headers: { Authorization: cookie.load('token') } 
    });

    cookie.remove('token', { path: '/' });
    cookie.remove('user', { path: '/' });    
  },
  renderLinks() {
    let user = cookie.load('user')
    console.log(user);
    if (user !== undefined) {
      return [
        <li key={`${1}header`}>
          <Link to="/my-profile"><MdPersonOutline className="nav-size" /></Link>
        </li>,
        <li key={`${2}header`}>
          <Link to="/swatch" className="swipe-icon"><SwipeIcon className="nav-size swipe-icon" /></Link>
        </li>,
        <li key={`${3}header`}>
          <Link to="/" onClick={this.logoutUser}><MdExitApp className="nav-size" /></Link>
        </li>
      ];
    } else {
      return [
        // Unauthenticated navigation
        <li>
          <HeaderLogin />
        </li>
      ];
    }
  },

  render: function () {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="nav-container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-collapse">
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <span className="navbar-brand">{this.props.logo}</span>
            </div>

            <div className="collapse navbar-collapse" id="nav-collapse">
              <ul className="nav navbar-nav navbar-right">
                {this.renderLinks()}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
})

module.exports = Header;