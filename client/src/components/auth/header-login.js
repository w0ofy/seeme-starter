import { Link } from 'react-router';
const axios = require('axios');
const React = require('react');
const cookie = require('react-cookie');

const HeaderLogin = React.createClass({
  getInitialState: function () {
    return {
      email: '',
      password: ''
    };
  },
  handleSubmit: function (e) {
    e.preventDefault();
    axios.post('http://localhost:3000/api/auth/login', {
      email: this.state.email,
      password: this.state.password
    })
      .then((response) => {
        cookie.save('token', response.data.token, { path: '/' });
        cookie.save('user', response.data.user, { path: '/' });
        window.location.href = "http://localhost:8080/my-profile";
      })
      .catch((error) => {
        console.log(error);
      });
  },

  render: function () {

    return (
      <div className="header-login">
          <form id="header-login" onSubmit={this.handleSubmit}>
            <div className="l-input-ct">
              <input palceholder="email" name="email" type="text" onChange={this.updateEmailValue} ref="email" />
            </div>
            <div className="l-input-ct">
              <input palceholder="password" name="password" type="password" onChange={this.updatePasswordValue} ref="password" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          
        </div>
    );
  },
  updateEmailValue: function (evt) {
    this.setState({
      email: evt.target.value
    });
  },
  updatePasswordValue: function (evt) {
    this.setState({
      password: evt.target.value
    });
  }
})

module.exports = HeaderLogin;