const cookie = require('react-cookie')
const axios = require('axios');
const React = require('react');
const EditInfo = require('./edit-info');
const UserInfo = require('./user-info');
import PhotoBoothModal from './photo-booth-modal';
import TrashLook from './utils/trash-look';
import TrashLookTwo from './utils/trash-look-two';
import TrashLookThree from './utils/trash-look-three';
import TrashLookFour from './utils/trash-look-four';
import TrashLookFive from './utils/trash-look-five';
import TrashLookSix from './utils/trash-look-six';
// const PhotoBooth = require('./photo-booth');

const YourProfile = React.createClass({
    componentWillMount() {
        // Fetch user data prior to component mounting
        let user = cookie.load('user');
        console.log("this user is:", user._id + " " + user.email);

        if (user == undefined) {
            window.location.href = 'http://localhost:8080/login';
        } else {
            let gender = user.is_male;
            if (gender === false) {
                gender = "girl";
            } else {
                gender = "guy";
            }
            this.setState({
                firstName: user.firstName,
                age: user.age,
                age_pref_min: user.age_pref_min,
                age_pref_max: user.age_pref_max,
                is_male: gender,
                seeking_male: user.seeking_male,
                look: user.looks[0] ? user.looks[0].link : "",
                lookTwo: user.looks[1] ? user.looks[1].link : "",
                lookThree: user.looks[2] ? user.looks[2].link : "",
                lookFour: user.looks[3] ? user.looks[3].link : "",
                lookFive: user.looks[4] ? user.looks[4].link : "",
                lookSix: user.looks[5] ? user.looks[5].link : "",
            })
        }
    },

    render: function () {

        return (
            <div>
                <div className="lookContainer">
                    <span className="look"><video id="vid-look" className="video vid-look" src={this.state.look} />
                        
                    </span>
                    <span className="look"><video id="vid-look-two" className="video vid-look" src={this.state.lookTwo} />
                    </span>
                    <span className="look"><video id="vid-look-three" className="video vid-look" src={this.state.lookThree} />
                        
                    </span>
                    <span className="look"><video id="vid-look-four" className="video vid-look" src={this.state.lookFour} />
                        
                    </span>
                    <span className="look"><video id="vid-look-five" className="video vid-look" src={this.state.lookFive} />
                        
                    </span>
                    <span className="look"><video id="vid-look-six" className="video vid-look" src={this.state.lookSix} />
                        
                    </span>
                </div>

                <YourInfo firstName={this.state.firstName}
                    is_male={this.state.is_male} age={this.state.age}
                    seeking_male={this.state.seeking_male}
                    age_pref_min={this.state.age_pref_min}
                    age_pref_max={this.state.age_pref_max}
                    look={this.state.look}
                    lookTwo={this.state.lookTwo}
                    lookThree={this.state.lookThree}
                    lookFour={this.state.lookFour}
                    lookFive={this.state.lookFive}
                    lookSix={this.state.lookSix} />
            </div>
        );
    }    
});

module.exports = YourProfile;