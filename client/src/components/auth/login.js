import React, { Component } from 'react';
import { Link } from 'react-router';
const axios = require('axios');
const cookie = require('react-cookie');

class Login extends React.Component {
  getInitialState () {
    return {
      email: '',
      password: ''
    };
  }
  handleSubmit (e) {
    e.preventDefault();
    axios.post('https://seemedate.herokuapp.com/api/auth/login', {
      email: this.state.email,
      password: this.state.password
    })
      .then((response) => {
        cookie.save('token', response.data.token, { path: '/' });
        cookie.save('user', response.data.user, { path: '/' });
        window.location.href = "https://seemedate.herokuapp.com/my-profile";
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render () {

    return (
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3 col-xs-12">
          <form id="login" onSubmit={this.handleSubmit}>

            <div>
              <label>Email</label>
              <input name="email" type="text" onChange={this.updateEmailValue} ref="email" />
            </div>
            <div>
              <label>Password</label>
              <input name="password" type="password" onChange={this.updatePasswordValue} ref="password" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    );
  }
  updateEmailValue (evt) {
    this.setState({
      email: evt.target.value
    });
  }
  updatePasswordValue (evt) {
    this.setState({
      password: evt.target.value
    });
  }
};
export default Login;