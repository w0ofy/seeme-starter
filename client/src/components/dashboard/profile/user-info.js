
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
      outdoors: user.interests.outdoors
    }
  },
  render() {
    return (
      <div className="user-info">
        <div className="edit-container">

        </div>
        <div className="flex-col">
          <div className="user-info-text">
            <h4>My name is:</h4><h3>{this.props.firstName}</h3>
            <h4>I am a:</h4><h3>{this.props.is_male}</h3>
            <h4>My age:</h4><h3>{this.props.age}</h3>
            <h4>I am looking to meet a {this.props.seeking_male} between the ages:</h4>
            <h3>{this.props.age_pref_min} and {this.props.age_pref_max}</h3>
          </div>
          <div className="user-interests">
            <div className="flex-row">
              {this.state.cycling ? <span className="int-text"><i><FaBicycle /></i><p>Cycling</p></span> : null}
              {this.state.sleeping ? <span className="int-text"><i><FaBed /></i><p>Sleeping</p></span> : null}
              {this.state.motorcycles ? <span className="int-text"><i><FaMotorcycle /></i><p>Motorcycles</p></span> : null}
              {this.state.learning ? <span className="int-text"><i><FaGraduationCap /></i><p>Learning</p></span> : null}

              {this.state.traveling ? <span className="int-text"><i><FaPlane /></i><p>Traveling</p></span> : null}
              {this.state.innovating ? <span className="int-text"><i><FaLightbulbO /></i><p>Innovating</p></span> : null}
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
    );
  }
})

module.exports = UserInfo;