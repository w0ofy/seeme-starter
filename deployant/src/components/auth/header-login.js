import { Link } from 'react-router';
import React, { Component } from 'react';
const axios = require('axios');
const cookie = require('react-cookie');

class HeaderLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    axios.post('http://seemeapp.herokuapp.com/api/auth/login', {
      email: this.state.email,
      password: this.state.password
    })
      .then((response) => {
        cookie.save('token', response.data.token, { path: '/' });
        cookie.save('user', response.data.user, { path: '/' });
        window.location.href = "http://seemeapp.herokuapp.com/my-profile";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {

    return (
      <div className="header-login">
        <form id="header-login" onSubmit={this.handleSubmit}>
          <div className="l-input-ct">
            <input placeholder="email" name="email" type="text" onChange={this.updateEmailValue} ref="email" />
          </div>
          <div className="l-input-ct">
            <input placeholder="password" name="password" type="password" onChange={this.updatePasswordValue} ref="password" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>

      </div>
    );
  }
  updateEmailValue(evt) {
    this.setState({
      email: evt.target.value
    });
  }
  updatePasswordValue(evt) {
    this.setState({
      password: evt.target.value
    });
  }
};

export default HeaderLogin