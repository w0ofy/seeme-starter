const React = require('react');
const cookie = require('react-cookie')
const axios = require('axios')

const user = cookie.load('user')

const Logout = React.createClass({
  logoutUser(error) {
  
    let emailQuery = { email: user.email };
    axios.put('http://localhost:3000/api/auth/logout', { emailQuery
    },
      { headers: { Authorization: cookie.load('token') } 
    });

    cookie.remove('token', { path: '/' });
    cookie.remove('user', { path: '/' });

    setTimeout(function() {
      window.location.href = 'http://localhost:8080/'
    }, 2000);
    
  },
  componentWillMount() {
    {this.logoutUser()}
  },

  render() {
    return <div className="logout-msg">see you soon!</div>;
  }
})

module.exports = Logout;