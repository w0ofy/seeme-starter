import * as actions from '../../actions/auth';
const React = require('react');
const cookie = require('react-cookie')



const Logout = React.createClass({
  logoutUser(error) {

    // dispatch({ type: UNAUTH_USER, payload: error || '' });
    cookie.remove('token', { path: '/' });
    cookie.remove('user', { path: '/' });

    window.location.href = 'http://localhost:8080/'
  },
  componentWillMount() {
    {this.logoutUser()}
  },

  render() {
    return <div>see you soon!</div>;
  }
})

module.exports = Logout;
