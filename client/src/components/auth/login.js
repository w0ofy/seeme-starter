import { Link } from 'react-router';
const axios = require('axios');
const React = require('react');
const cookie = require('react-cookie');

const Login = React.createClass({
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

module.exports = Login;