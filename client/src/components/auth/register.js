const axios = require('axios');
const React = require('react');
import asyncValidate from './validate/asyncValidate';

const Register = React.createClass({
  getInitialState: function () {
    return {
      email: '',
      firstName: '',
      lastInital: '',
      password: '',
      age: '',
      is_male: '',
      seeking_male: ''
    };
  },
  handleSubmit: function (e) {

    axios.post(`${API_URL}/auth/register`, {
      email: this.state.email,
      firstName: this.state.firstName,
      lastInitial: this.state.lastInital,
      password: this.state.password,
      age: this.state.age,
      is_male: this.state.is_male,
      seeking_male: this.state.seeking_male
    })
      .then((response) => {
        cookie.save('token', response.data.token, { path: '/' });
        cookie.save('user', response.data.user, { path: '/' });

        window.location.href = `${CLIENT_ROOT_URL}/my-profile`;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  },


  render: function () {
    const { handleSubmit } = this.props;

    return (
      <form id="register" onSubmit={this.handleSubmit}>

        <div className="row">
          <div className="col-md-6">

            <input placeholder="First Name" name="firstName" onChange={this.updateEmailValue} type="text" />
          </div>
          <div className="col-md-6">

            <input name="lastInitial"  type="text" onChange={this.updateEmailValue} placeholder="Last Initial" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">

            <input name="email"  type="text" onChange={this.updateEmailValue} placeholder="Email" />
          </div>
          <div className="col-md-6">

            <input name="password" type="password" onChange={this.updateEmailValue} placeholder="Password" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <input name="age"  type="text" onChange={this.updateEmailValue} placeholder="Age" />
          </div>
          <div className="col-md-6">
            <select name="is_male" onChange={this.updateEmailValue}>
              <option></option>
              <option value="true">Male</option>
              <option value="false">Female</option>
            </select>
          </div>
          <div className="col-md-6">
            <select name="seeking_male" onChange={this.updateEmailValue}>
              <option>Looking to meet a</option>
              <option value="true">Guy</option>
              <option value="false">Girl</option>
            </select>
          </div>
        </div>
        <input type="submit" className="btn btn-success">Sign Up</input>
      </form>
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
})

module.exports = Register;