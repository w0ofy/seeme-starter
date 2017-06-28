const axios = require('axios');
const React = require('react');
const cookie = require('react-cookie');
const editInfo = React.createClass({

  getInitialState: function () {
    return {
      firstName: "",
      is_male: "",
      seeking_male: "",
      age: "",
      age_pref_min: "",
      age_pref_max: "",
    }
  },

  handleChange: function (key) {
    return function (e) {
      let state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  },

  handleFormSubmit: function (e) {

    e.preventDefault();

    let userProfile = this.state;

    console.log(userProfile);

    for (let prop in userProfile) {
      if (userProfile[prop] === "") {
        userProfile[prop] = this.props[prop];
        console.log(userProfile[prop]);
      };
    };

    const user = cookie.load('user');
    const emailQuery = user.email;
    axios.put('http://localhost:3000/api/user/update', {
      emailQuery: emailQuery,
      firstName: userProfile.firstName,
      is_male: userProfile.is_male,
      seeking_male: userProfile.seeking_male,
      age: userProfile.age,
      age_pref_min: userProfile.age_pref_min,
      age_pref_max: userProfile.age_pref_max
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
          <input onChange={this.handleChange("firstName")} name="firstName" type="text" placeholder={this.props.firstName} />
          <label>I am a:</label>
          <select onChange={this.handleChange("is_male")} name="is_male">
            <option value="false">Girl</option>
            <option value="true">Guy</option>
          </select>
          <label>I am looking to meet a:</label>
          <select onChange={this.handleChange("seeking_male")} name="seeking_male" >
            <option value="true">Guy</option>
            <option value="false">Girl</option>
          </select>
          <input onChange={this.handleChange("age")} name="age" type="text" placeholder={this.props.age} />
          <input onChange={this.handleChange("age_pref_min")} name="age_pref_min" id="min" className="inline" type="text" placeholder={this.props.age_pref_min} />
          <input onChange={this.handleChange("age_pref_max")} name="age_pref_max" id="max" className="inline" type="text" placeholder={this.props.age_pref_max} />
          <button type="submit" className="btn btn-success">Save Profile Info</button>
        </form>
      </div>
    );
  }
});

// export default EditInfo;
module.exports = editInfo