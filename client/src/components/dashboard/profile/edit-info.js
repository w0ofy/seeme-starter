const axios = require('axios');
const React = require('react');
const cookie = require('react-cookie');

const EditInfo = React.createClass({

  getInitialState: function () {
    let user = cookie.load('user');
    return {
      firstName: user.firstName,
      is_male: user.is_male,
      seeking_male: user.seeking_male,
      age: user.age,
      age_pref_min: user.age_pref_min,
      age_pref_max: user.age_pref_max,
    }
  },

  handleFormSubmit: function (e) {

    e.preventDefault();

    const user = cookie.load('user');
    const emailQuery = user.email;
    axios.put('http://localhost:3000/api/see/update', {
      emailQuery: emailQuery,
      firstName: this.state.firstName,
      is_male: this.state.is_male,
      seeking_male: this.state.seeking_male,
      age: this.state.age,
      age_pref_min: this.state.age_pref_min,
      age_pref_max: this.state.age_pref_max
    },
      { headers: { Authorization: cookie.load('token') } })
      .then((response) => {
        cookie.save('token', response.data.token, { path: '/' });
        cookie.save('user', response.data.user, { path: '/' });
        window.location.href = 'http://localhost:8080/my-profile';
      })
      .catch((error) => {
        console.log(error);
      });
  },

  render: function () {
    return (
      <div className="edit-info">
        <form id="edit-info" onSubmit={this.handleFormSubmit}>
          <label>My name is:</label>
          <input onChange={this.handleChange} name="firstName" type="text" placeholder={this.state.firstName} />
          <label>I am a:</label>
          <select value={this.state.is_male} onChange={this.handleChange} name="is_male">
            <option disabled>{this.state.is_male}</option>
            <option value="false">Girl</option>
            <option value="true">Guy</option>
          </select>
          <label>I am looking to meet a:</label>
          <select value={this.state.seeking_male} onChange={this.handleChange} name="seeking_male">
            <option disabled>{this.state.seeking_male}</option>
            <option value="true">Guy</option>
            <option value="false">Girl</option>
          </select>
          <input onChange={this.handleChange} name="age" type="text" placeholder={this.state.age} />
          <input onChange={this.handleChange} name="age_pref_min" id="min" className="inline" type="text" placeholder={this.state.age_pref_min} />
          <input onChange={this.handleChange} name="age_pref_max" id="max" className="inline" type="text" placeholder={this.state.age_pref_max} />
          <button type="submit" className="btn btn-success">Save Profile Info</button>
        </form>
      </div>
    );
  },
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
});

// export default EditInfo;
module.exports = EditInfo