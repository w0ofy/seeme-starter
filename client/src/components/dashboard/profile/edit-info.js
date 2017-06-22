const axios = require('axios');
const React = require('react');

var editInfo = React.createClass({

  getInitialState: function () {
    return {
      firstName: "",
      email: "",
      age: "",
      age_pref_min: "",
      age_pref_max: "",
    }
  },

  handleChange: function (key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  },

  handleFormSubmit: function (event) {

    event.preventDefault();

    let userProfile = this.state;

    console.log(userProfile);

    for (var prop in userProfile) {
      if (userProfile[prop] === "") {
        userProfile[prop] = this.props[prop];
        console.log(userProfile[prop]);
      };
    };

    axios.put('http://localhost:3000/api/user/update', { firstName, email, age, age_pref_min, age_pref_max }, 
    { headers: { Authorization: cookie.load('token') } })
      .then((response) => {

        window.location.href = 'http://localhost:8080/my-profile';
      })
      .catch((error) => {
        errorHandler(dispatch, error.response);
      });
  },

  render: function () {
    return (
      <div className="edit-info">
        <form id="edit-info" onSubmit={this.handleFormSubmit}>
          <input onChange={this.handleChange("firstName")} name="firstName" type="text" placeholder={this.props.firstName} />
          <input onChange={this.handleChange("email")} name="email" type="text" placeholder={this.props.email} />
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