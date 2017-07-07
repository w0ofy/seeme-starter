const axios = require('axios');
const React = require('react');
const cookie = require('react-cookie');
import Female from 'react-icons/lib/md/female';
import Male from 'react-icons/lib/md/male';
import FaBicycle from 'react-icons/lib/fa/bicycle';
import FaBed from 'react-icons/lib/fa/bed';
import FaNewspaperO from 'react-icons/lib/fa/newspaper-o';
import FaMotorcycle from 'react-icons/lib/fa/motorcycle';
import FaBank from 'react-icons/lib/fa/bank';
import FaAutomobile from 'react-icons/lib/fa/automobile';
import FaBriefcase from 'react-icons/lib/fa/briefcase';
import FaPlane from 'react-icons/lib/fa/plane';
import FaLightbulbO from 'react-icons/lib/fa/lightbulb-o';
import FaGavel from 'react-icons/lib/fa/Gavel';
import FaPaintBrush from 'react-icons/lib/fa/paint-brush';
import FaCalculator from 'react-icons/lib/fa/calculator';
import FaGraduationCap from 'react-icons/lib/fa/graduation-cap';
import FaCamera from 'react-icons/lib/fa/camera';
import FaMusic from 'react-icons/lib/fa/music';
import FaSpoon from 'react-icons/lib/fa/spoon';
import FaTree from 'react-icons/lib/fa/tree';
import { RadioGroup, Radio } from 'react-radio-group';

const EditInfo = React.createClass({

  getInitialState: function () {
    let user = cookie.load('user');
    console.log(user.interests);
    return {
        firstName: user.firstName,
        is_male: user.is_male,
        seeking_male: user.seeking_male,
        age: user.age,
        age_pref_min: user.age_pref_min,
        age_pref_max: user.age_pref_max,
        cycling: user.interests.cycling,
        news: user.interests.news,
        sleeping: user.interests.sleeping,
        politics: user.interests.politics,
        motorcycles: user.interests.motorcycles,
        cars: user.interests.cars,
        working: user.interests.working,
        photography: user.interests.photography,
        learning: user.interests.learning,
        traveling: user.interests.traveling,
        innovating: user.interests.innovating,
        law: user.interests.law,
        art: user.interests.art,
        math: user.interests.math,
        music: user.interests.music,
        cooking: user.interests.cooking,
        outdoors: user.interests.outdoors
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
        age_pref_max: this.state.age_pref_max,
        cycling: this.state.cycling,
        news: this.state.news,
        sleeping: this.state.sleeping,
        politics: this.state.politics,
        motorcycles: this.state.motorcycles,
        cars: this.state.cars,
        working: this.state.working,
        photography: this.state.photography,
        learning: this.state.learning,
        traveling: this.state.traveling,
        innovating: this.state.innovating,
        law: this.state.law,
        art: this.state.art,
        math: this.state.math,
        school: this.state.school,
        music: this.state.music,
        cooking: this.state.cooking,
        outdoors: this.state.outdoors
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
              <span className="form-section-title">Things I Like</span>
            </div>
            <div className="form-col">
              <span>
                <input className="interest-box" onChange={this.handleChange} type="checkbox" id="cycling" name="cycling" defaultChecked={this.state.cycling === true} /><label htmlFor="cycling" className="radio-label"><i><FaBicycle /></i>Biycling</label>
              </span>
              <span>
                <input className="interest-box" onChange={this.handleChange} type="checkbox" id="news" name="news" defaultChecked={this.state.news === true} /><label htmlFor="news" className="radio-label"><i><FaNewspaperO /></i>News</label>
              </span>
              <span>
                <input className="interest-box" onChange={this.handleChange} type="checkbox" id="sleeping" name="sleeping" defaultChecked={this.state.sleeping === true} /><label htmlFor="sleeping" className="radio-label"><i><FaBed /></i>Sleeping</label>
              </span>
              <span>
                <input className="interest-box" onChange={this.handleChange} type="checkbox" id="politics" name="politics" defaultChecked={this.state.politics === true} /><label htmlFor="politics" className="radio-label"><i><FaBank /></i>Politics</label>
              </span>
              <span>
                <input className="interest-box" onChange={this.handleChange} type="checkbox" id="motorcycles" name="motorcycles" defaultChecked={this.state.motorcycles === true} /><label htmlFor="books" className="radio-label"><i><FaMotorcycle /></i>Motorcycles</label>
              </span>
              <span>
                <input className="interest-box" onChange={this.handleChange} type="checkbox" id="cars" name="cars" defaultChecked={this.state.cars === true} /><label htmlFor="cars" className="radio-label"><i><FaAutomobile /></i>Cars</label>
              </span>
              <span>
                <input className="interest-box" onChange={this.handleChange} type="checkbox" id="learning" name="learning" defaultChecked={this.state.learning === true} /><label htmlFor="learning" className="radio-label"><i><FaGraduationCap /></i>Learning</label>
              </span>
              <span>
                <input className="interest-box" onChange={this.handleChange} type="checkbox" id="working" name="working" defaultChecked={this.state.working === true} /><label htmlFor="working" className="radio-label"><i><FaBriefcase/></i>Working</label>
              </span>
              <span>
                <input className="interest-box" onChange={this.handleChange} type="checkbox" id="traveling" name="traveling" defaultChecked={this.state.traveling === true} /><label htmlFor="traveling" className="radio-label"><i><FaPlane /></i>Traveling</label>
              </span>
              <span>
                <input className="interest-box" onChange={this.handleChange} type="checkbox" id="innovating" name="innovating" defaultChecked={this.state.innovating === true} /><label htmlFor="innovating" className="radio-label"><i><FaLightbulbO /></i>Innovating</label>
              </span>
              <span>
                <input className="interest-box" onChange={this.handleChange} type="checkbox" id="law" name="law" defaultChecked={this.state.law === true} /><label htmlFor="law" className="radio-label"><i><FaGavel /></i>Law</label>
              </span>
              <span>
                <input className="interest-box" onChange={this.handleChange} type="checkbox" id="art" name="art" defaultChecked={this.state.art === true} /><label htmlFor="art" className="radio-label"><i><FaPaintBrush /></i>Art</label>
              </span>
              <span>
                <input className="interest-box" onChange={this.handleChange} type="checkbox" id="math" name="math" defaultChecked={this.state.math === true} /><label htmlFor="math" className="radio-label"><i><FaCalculator /></i>Math</label>
              </span>
              <span>
                <input className="interest-box" onChange={this.handleChange} type="checkbox" id="photography" name="photography" defaultChecked={this.state.photography === true} /><label htmlFor="photography" className="radio-label"><i><FaCamera /></i>Photography</label>
              </span>
              <span>
                <input className="interest-box" onChange={this.handleChange} type="checkbox" id="music" name="music" defaultChecked={this.state.music === true} /><label htmlFor="music" className="radio-label"><i><FaMusic /></i>Music</label>
              </span>
              <span>
                <input className="interest-box" onChange={this.handleChange} type="checkbox" id="cooking" name="cooking" defaultChecked={this.state.cooking === true} /><label htmlFor="cooking" className="radio-label"><i><FaSpoon /></i>Cooking</label>
              </span>
              <span>
                <input className="interest-box" onChange={this.handleChange} type="checkbox" id="outdoors" name="outdoors" defaultChecked={this.state.outdoors === true} /><label htmlFor="outdoors" className="radio-label"><i><FaTree /></i>Outdoors</label>
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
    console.log(name, value);
    this.setState({
      [name]: value
    });
  }
});

// export default EditInfo;
module.exports = EditInfo