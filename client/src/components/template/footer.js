import React, { Component } from 'react';
import { Link } from 'react-router';

const Footer = React.createClass({


  render() {
    return (
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p className="copyright">© 2017, seemē. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }

})

module.exports = Footer;