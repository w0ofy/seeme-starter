const axios = require('axios');
const React = require('react');
const cookie = require('react-cookie');
import asyncValidate from './validate/asyncValidate';

const Register = React.createClass({
  getInitialState: function () {
    return {
      email: '',
      firstName: '',
      password: '',
      age: '',
      is_male: '',
      seeking_male: ''
    };
  },
  handleSubmit: function (e) {
    e.preventDefault();
    axios.post('http://localhost:3000/api/auth/register', {
      email: this.state.email,
      firstName: this.state.firstName,
      password: this.state.password,
      age: this.state.age,
      is_male: this.state.is_male,
      seeking_male: this.state.seeking_male,
      logged_in: true
    })
      .then((response) => {
        cookie.save('token', response.data.token, { path: '/' });
        cookie.save('user', response.data.user, { path: '/' });

        window.location.href = 'http://localhost:8080/my-profile';
      })
      .catch((err) => {
        console.log(err);
      });
  },


  render: function () {
    // const { handleSubmit } = this.props;

    return (
      <div>

        <div className="row">
          <div className="col-md-12">


            <div className="row">
              <div className="col-md-4">
                <input placeholder="First Name" name="firstName" onChange={this.handleInputChange} value={this.state.firstName} type="text" />
              </div>
            </div>

            <div className="col-md-4">
              <input name="email" type="text" onChange={this.handleInputChange} value={this.state.email} placeholder="Email" />
            </div>

            <div className="col-md-4">
              <input name="password" type="password" onChange={this.handleInputChange} value={this.state.password} placeholder="Password" />
            </div>

          </div>

          <div className="row">
            <div className="col-md-6">
              <input name="age" type="text" onChange={this.handleInputChange} value={this.state.age} placeholder="Age" />
            </div>

          </div>

          <div className="row">

            <div className="col-md-6">
              <select name="is_male" onChange={this.handleInputChange}>
                <option>I am a</option>
                <option value="true">Guy</option>
                <option value="false">Girl</option>
              </select>

            </div>
          </div>
          <div className="row">

            <div className="col-md-6">
              <select name="seeking_male" onChange={this.handleInputChange}>
                <option>Looking to meet a</option>
                <option value="false">Girl</option>
                <option value="true">Guy</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6 col-sm-3">
              <input type="submit" className="btn btn-success" value="Create Account" />
            </div>
          </div>

        </div>
      </div>
    );
  },

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
})

module.exports = Register;