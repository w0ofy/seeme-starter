import React, { Component } from 'react';
const cookie = require('react-cookie')
const axios = require('axios')
const user = cookie.load('user')

class Logout extends React.Component {

  logoutUser(error) {
  
    let emailQuery = { email: user.email };
    axios.put('http://seemeapp.herokuapp.com/api/auth/logout', { emailQuery
    },
      { headers: { Authorization: cookie.load('token') } 
    });

    cookie.remove('token', { path: '/' });
    cookie.remove('user', { path: '/' });

    setTimeout(function() {
      window.location.href = 'http://seemeapp.herokuapp.com/'
    }, 1000);
    
  }
  componentWillMount() {
    {this.logoutUser()}
  }

  render() {
    return <div className="logout-msg">see you soon!</div>;
  }
};
export default Logout;