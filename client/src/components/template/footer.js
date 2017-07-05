import React, { Component } from 'react';
import { Link } from 'react-router';
const cookie = require('react-cookie');

const Footer = React.createClass({
  renderFooter() {
    let user = cookie.load('user');
    if (user !== undefined) {
      return (<span className="empty" />)
    } else return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <p className="copyright">© 2017, seemē. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    )
  },

  render() {
    return (
      <footer>
        {this.renderFooter()}
      </footer>
    );
  }

})

module.exports = Footer;