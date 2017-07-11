const cookie = require('react-cookie')
const axios = require('axios');
const React = require('react');
const EditInfo = require('./edit-info');
const YourInfo = require('./your-info');
const YourTitle = require('./your-title');
import PhotoBoothModal from './photo-booth-modal';
import TrashLook from './utils/trash-look';
import TrashLookTwo from './utils/trash-look-two';
import TrashLookThree from './utils/trash-look-three';
import TrashLookFour from './utils/trash-look-four';
import TrashLookFive from './utils/trash-look-five';
import TrashLookSix from './utils/trash-look-six';
// const PhotoBooth = require('./photo-booth');

class YourProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            age: "",
            age_pref_min: "",
            age_pref_max: "",
            is_male: "",
            seeking_male: "",
            look: "",
            lookTwo: "",
            lookThree: "",
            lookFour: "",
            lookFive: "",
            lookSix: "",
        }
    }
    componentWillMount() {
        let removeScript = document.getElementById('main');
        $(removeScript).remove();
        const script = document.createElement("script");
        script.setAttribute("id", "main");
        script.src = "/src/public/js/script.js";
        script.async = true;
        document.body.appendChild(script);
    }
    componentDidMount() {
        // Fetch user data prior to component mounting
        let user = cookie.load('user');
        let token = cookie.load('token');
        if (user == undefined) {
            window.location.href = 'http://localhost:8080/';
        } else {

            let theUser = null;
            let gender = null;
            // console.log("param", this.props.params.uid);

            const url = 'http://localhost:3000/api/' + this.props.params.uid;
            axios.get(url, { headers: { Authorization: token } }).then(viewUser => {
                // console.log(viewUser.data);
                theUser = viewUser.data.user
                gender = theUser.is_male;
                if (gender === false) {
                    gender = "girl";
                } else {
                    gender = "guy";
                }
                console.log("var", theUser);
                this.setState({
                    firstName: theUser.firstName,
                    age: theUser.age,
                    age_pref_min: theUser.age_pref_min,
                    age_pref_max: theUser.age_pref_max,
                    is_male: gender,
                    seeking_male: theUser.seeking_male,
                    look: theUser.looks[0] ? theUser.looks[0].link : " ",
                    lookTwo: theUser.looks[1] ? theUser.looks[1].link : " ",
                    lookThree: theUser.looks[2] ? theUser.looks[2].link : " ",
                    lookFour: theUser.looks[3] ? theUser.looks[3].link : " ",
                    lookFive: theUser.looks[4] ? theUser.looks[4].link : " ",
                    lookSix: theUser.looks[5] ? theUser.looks[5].link : " ",
                    cycling: theUser.interests.cycling,
                    news: theUser.interests.news,
                    sleeping: theUser.interests.sleeping,
                    motorcycles: theUser.interests.motorcycles,
                    cars: theUser.interests.cars,
                    photography: theUser.interests.photography,
                    learning: theUser.interests.learning,
                    traveling: theUser.interests.traveling,
                    innovating: theUser.interests.innovating,
                    art: theUser.interests.art,
                    music: theUser.interests.music,
                    cooking: theUser.interests.cooking,
                    outdoors: theUser.interests.outdoors
                })
                // console.log("state", this.setState);
            });

        }
    }

    render() {

        return (
            <div className="profile-ct">
                <YourTitle firstName={this.state.firstName} age={this.state.age} />
                <div className="lookContainer">
                    <span className="look" onClick={() => { this.refs.v1.paused ? this.refs.v1.play() : this.refs.v1.pause() }}><video id="vid-look" ref="v1" className="video vid-look" src={this.state.look} />

                    </span>
                    <span className="look" onClick={() => { this.refs.v2.paused ? this.refs.v2.play() : this.refs.v2.pause() }}><video id="vid-look-two" ref="v2" className="video vid-look" src={this.state.lookTwo} />
                    </span>
                    <span className="look" onClick={() => { this.refs.v3.paused ? this.refs.v3.play() : this.refs.v3.pause() }}><video id="vid-look-three" ref="v3" className="video vid-look" src={this.state.lookThree} />

                    </span>
                    <span className="look" onClick={() => { this.refs.v4.paused ? this.refs.v4.play() : this.refs.v4.pause() }}><video id="vid-look-four" ref="v4" className="video vid-look" src={this.state.lookFour} />

                    </span>
                    <span className="look" onClick={() => { this.refs.v5.paused ? this.refs.v5.play() : this.refs.v5.pause() }}><video id="vid-look-five" ref="v5" className="video vid-look" src={this.state.lookFive} />

                    </span>
                    <span className="look" onClick={() => { this.refs.v6.paused ? this.refs.v6.play() : this.refs.v6.pause() }}><video id="vid-look-six" ref="v6" className="video vid-look" src={this.state.lookSix} />

                    </span>
                    <span className="look" onClick={() => { this.refs.v7.paused ? this.refs.v7.play() : this.refs.v7.pause() }}><video id="vid-look-seven" ref="v7" className="video vid-look" src={this.state.lookSix} />

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
                    lookSix={this.state.lookSix}
                    cycling={this.state.cycling}
                    news={this.state.news}
                    sleeping={this.state.sleeping}
                    motorcycles={this.state.motorcycles}
                    cars={this.state.cars}
                    photography={this.state.photography}
                    learning={this.state.learning}
                    traveling={this.state.traveling}
                    innovating={this.state.innovating}
                    art={this.state.art}
                    music={this.state.music}
                    cooking={this.state.cooking}
                    outdoors={this.state.outdoors}
                />
            </div>
        );
    }
};

module.exports = YourProfile;