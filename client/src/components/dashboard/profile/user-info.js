
const
  React = require('react'),
  cookie = require('react-cookie');
import { Link } from 'react-router';
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
import Female from 'react-icons/lib/md/female';
import Male from 'react-icons/lib/md/male';
import { RadioGroup, Radio } from 'react-radio-group';

const UserInfo = React.createClass({

  getInitialState() {
    let user = cookie.load('user');
    console.log(user.interests);
    return {
      cycling: user.interests.cycling,
      news: user.interests.news,
      sleeping: user.interests.sleeping,
      motorcycles: user.interests.motorcycles,
      cars: user.interests.cars,
      photography: user.interests.photography,
      learning: user.interests.learning,
      traveling: user.interests.traveling,
      innovating: user.interests.innovating,
      art: user.interests.art,
      music: user.interests.music,
      cooking: user.interests.cooking,
      outdoors: user.interests.outdoors,
      firstName: user.firstName,
      is_male: user.is_male,
      seeking_male: user.seeking_male,
      age: user.age,
      age_pref_min: user.age_pref_min,
      age_pref_max: user.age_pref_max
    }
  },
  noLoves() {
    if (this.state.cycling==false && this.state.outdoors==false && this.state.cooking==false && this.state.music==false && this.state.art==false && this.state.innovating==false && this.state.traveling==false && this.state.learning==false && this.state.photography==false && this.state.cars==false && this.state.motorcycles==false && this.state.sleeping==false && this.state.news==false) {
      return (<div className="center-text"><h4>I don't like anything?</h4></div>)
    }
  },
  render() {
    return (
      <div className="user-info">
        <div className="edit-container"></div>
        <div id="edit-info" className="edit-info">
          <div className="app-section">
            <div className="form-section-row">
              <span className="form-section-title">The Basics</span>
            </div>

            <div className="form-row">
              <span className="form-label">Name</span>
              <input className="form-text" onChange={this.handleChange} name="firstName" type="text" placeholder={this.state.firstName} defaultValue={this.state.firstName} disabled />
            </div>
            <div className="form-row">
              <span className="form-label">Age</span>
              <input className="form-text" onChange={this.handleChange} name="age" type="number" placeholder={this.state.age} defaultValue={this.state.age} disabled />
            </div>

            <div className="form-row">
              <span className="form-label">Gender</span>
              <RadioGroup
                className="radio-group"
                name="is_male"
                is_male={this.state.is_male}
                onChange={this.handleRadioIsChange}>
                <Radio id="imale" value="true" defaultChecked={this.state.is_male === true} disabled /><label htmlFor="imale" className="radio-label pro"><i><Male /></i>Guy</label>
                <Radio id="ifemale" value="false" defaultChecked={this.state.is_male === false} disabled /><label htmlFor="ifemale" className="radio-label pro"><i><Female /></i>Girl</label>
              </RadioGroup>
            </div>
          </div>

          <div className="app-section">
            <div className="form-section-row">
              <span className="form-section-title">My Match Preferences</span>
            </div>
            <div className="form-row">
              <span className="form-label">Interested In</span>
              <RadioGroup
                className="radio-group"
                name="seeking_male"
                seeking_male={this.state.seeking_male}
                onChange={this.handleRadioSeekingChange}>
                <Radio id="smale" value="true" defaultChecked={this.state.seeking_male === true} disabled /><label htmlFor="smale" className="radio-label pro"><i><Male /></i>Guy</label>
                <Radio id="sfemale" value="false" defaultChecked={this.state.seeking_male === false} disabled /><label htmlFor="sfemale" className="radio-label pro"><i><Female /></i>Girl</label>
              </RadioGroup>
            </div>
            <div className="form-row">
              <span className="form-label">Age Range</span>
              <input onChange={this.handleChange} name="age_pref_min" id="min" className="inline pro" type="number" placeholder={this.state.age_pref_min} defaultValue={this.state.age_pref_min} disabled /> <span className="inline-label">to</span>
              <input onChange={this.handleChange} name="age_pref_max" id="max" className="inline" type="number" placeholder={this.state.age_pref_max} defaultValue={this.state.age_pref_max} disabled />
            </div>
          </div>

          <div className="app-section interests inter-col">
            <div className="form-section-row">
              <span className="form-section-title">The Things I Love</span>
            </div>
            <div className="form-col inter-col-pro">
              <div>
                
                {this.state.cycling ? <span className="int-text"><i><FaBicycle /></i><p>Cycling</p></span> : null}
                {this.state.sleeping ? <span className="int-text"><i><FaBed /></i><p>Sleeping</p></span> : null}
                {this.state.motorcycles ? <span className="int-text"><i><FaMotorcycle /></i><p>Motorcycles</p></span> : null}
                {this.state.learning ? <span className="int-text"><i><FaGraduationCap /></i><p>Learning</p></span> : null}
                {this.state.traveling ? <span className="int-text"><i><FaPlane /></i><p>Traveling</p></span> : null}
                {this.state.innovating ? <span className="int-text"><i><FaLightbulbO /></i><p>Innovating</p></span> : null}
              </div>

              <div>
                {this.state.photography ? <span className="int-text"><i><FaCamera /></i><p>Photography</p></span> : null}
                {this.state.cars ? <span className="int-text"><i><FaAutomobile /></i><p>Cars</p></span> : null}
                {this.state.news ? <span className="int-text"><i><FaNewspaperO /></i><p>News</p></span> : null}
                {this.state.art ? <span className="int-text"><i><FaPaintBrush /></i><p>Art</p></span> : null}
                {this.state.music ? <span className="int-text"><i><FaMusic /></i><p>Music</p></span> : null}
                {this.state.cooking ? <span className="int-text"><i><FaSpoon /></i><p>Cooking</p></span> : null}
                {this.state.outdoors ? <span className="int-text"><i><FaTree /></i><p>Outdoors</p></span> : null}
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
})

module.exports = UserInfo;