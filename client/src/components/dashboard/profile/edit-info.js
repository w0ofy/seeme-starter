const axios = require('axios');
const React = require('react');
const cookie = require('react-cookie');
import Female from 'react-icons/lib/md/female';
import Male from 'react-icons/lib/md/male';
import { RadioGroup, Radio } from 'react-radio-group';

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
      cycling: user.interests.cycling
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
  handleRadioIsChange(value) {
    this.setState({ is_male: value });
  },
  handleRadioSeekingChange(value) {
    this.setState({ seeking_male: value });
  },
  render: function () {
    return (
      <div className="edit-info">
        <form id="edit-info" onSubmit={this.handleFormSubmit}>
          <div className="app-section">
            <div className="form-section-row">
              <span className="form-section-title">Basic Info</span>
            </div>

            <div className="form-row">
              <span className="form-label">Name</span>
              <input className="form-text" onChange={this.handleChange} name="firstName" type="text" placeholder={this.state.firstName} defaultValue={this.state.firstName} />
            </div>
            <div className="form-row">
              <span className="form-label">Age</span>
              <input className="form-text" onChange={this.handleChange} name="age" type="number" placeholder={this.state.age} defaultValue={this.state.age} />
            </div>

            <div className="form-row">
              <span className="form-label">Gender</span>
              <RadioGroup
                className="radio-group"
                name="is_male"
                is_male={this.state.is_male}
                onChange={this.handleRadioIsChange}>
                <Radio id="imale" value="true" defaultChecked={this.state.is_male === true} /><label htmlFor="imale" className="radio-label"><i><Male /></i>Guy</label>
                <Radio id="ifemale" value="false" defaultChecked={this.state.is_male === false} /><label htmlFor="ifemale" className="radio-label"><i><Female /></i>Girl</label>
              </RadioGroup>
            </div>
          </div>

          <div className="app-section">
            <div className="form-section-row">
              <span className="form-section-title">Match Preferences</span>
            </div>
            <div className="form-row">
              <span className="form-label">Interested In</span>
              <RadioGroup
                className="radio-group"
                name="seeking_male"
                seeking_male={this.state.seeking_male}
                onChange={this.handleRadioSeekingChange}>
                <Radio id="smale" value="true" defaultChecked={this.state.seeking_male === true} /><label htmlFor="smale" className="radio-label"><i><Male /></i>Guy</label>
                <Radio id="sfemale" value="false" defaultChecked={this.state.seeking_male === false} /><label htmlFor="sfemale" className="radio-label"><i><Female /></i>Girl</label>
              </RadioGroup>
            </div>
            <div className="form-row">
              <span className="form-label">Age Range</span>
              <input onChange={this.handleChange} name="age_pref_min" id="min" className="inline" type="number" placeholder={this.state.age_pref_min} defaultValue={this.state.age_pref_min} /> <span className="inline-label">to</span>
              <input onChange={this.handleChange} name="age_pref_max" id="max" className="inline" type="number" placeholder={this.state.age_pref_max} defaultValue={this.state.age_pref_max} />
            </div>
          </div>



          <div className="app-section interests">
            <div className="form-section-row">
              <span className="form-section-title">Other Things</span>
            </div>
            <div className="form-col">
              <span>
                <input className="interest-box" type="checkbox" id="cycling" value="true" name="cycling" defaultChecked={this.state.cycling === true} /><label htmlFor="cycling" className="radio-label"><i><Male /></i>Cycling</label>
              </span>
              <span>
                <input className="interest-box" type="checkbox" id="cycling" value="true" name="cycling" defaultChecked={this.state.cycling === true} /><label htmlFor="cycling" className="radio-label"><i><Male /></i>Cycling</label>
              </span>
              <span>
                <input className="interest-box" type="checkbox" id="cycling" value="true" name="cycling" defaultChecked={this.state.cycling === true} /><label htmlFor="cycling" className="radio-label"><i><Male /></i>Cycling</label>
              </span>
              <span>
                <input className="interest-box" type="checkbox" id="cycling" value="true" name="cycling" defaultChecked={this.state.cycling === true} /><label htmlFor="cycling" className="radio-label"><i><Male /></i>Cycling</label>
              </span>
              <span>
                <input className="interest-box" type="checkbox" id="cycling" value="true" name="cycling" defaultChecked={this.state.cycling === true} /><label htmlFor="cycling" className="radio-label"><i><Male /></i>Cycling</label>
              </span>
              <span>
                <input className="interest-box" type="checkbox" id="cycling" value="true" name="cycling" defaultChecked={this.state.cycling === true} /><label htmlFor="cycling" className="radio-label"><i><Male /></i>Cycling</label>
              </span>
              <span>
                <input className="interest-box" type="checkbox" id="cycling" value="true" name="cycling" defaultChecked={this.state.cycling === true} /><label htmlFor="cycling" className="radio-label"><i><Male /></i>Cycling</label>
              </span>

            </div>
          </div>



          <div className="form-row">
            <button type="submit" className="btn btn-lg btn-success">Save Profile Info</button>
          </div>
        </form>
      </div>
    );
  },
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
});

// export default EditInfo;
module.exports = EditInfo