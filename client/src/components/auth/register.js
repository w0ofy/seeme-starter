const axios = require('axios');
const React = require('react');
import asyncValidate from './validate/asyncValidate';

const Register = React.createClass({


  handleSubmit: function (e) {

    axios.post(`${API_URL}/auth/register`, {
      email,
      firstName,
      lastInitial,
      password,
      age,
      is_male,
      seeking_male
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
      <form id="register" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

        <div className="row">
          <div className="col-md-6">

            <input placeholder="First Name" name="firstName"  type="text" />
          </div>
          <div className="col-md-6">

            <input name="lastInitial"  type="text" placeholder="Last Initial" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">

            <input name="email"  type="text" placeholder="Email" />
          </div>
          <div className="col-md-6">

            <input name="password" type="password" component="input" placeholder="Password" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <input name="age"  type="text" placeholder="Age" />
          </div>
          <div className="col-md-6">
            <select name="is_male" component="select">
              <option></option>
              <option value="true">Male</option>
              <option value="false">Female</option>
            </select>
          </div>
          <div className="col-md-6">
            <select name="seeking_male" component="select">
              <option>Looking to meet a</option>
              <option value="true">Guy</option>
              <option value="false">Girl</option>
            </select>
          </div>
        </div>
        <input type="submit" className="btn btn-success">Sign Up</input>
      </form>
    );
  }
})

module.exports = Register;