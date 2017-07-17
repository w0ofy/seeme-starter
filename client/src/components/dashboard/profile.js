import React, { Component } from 'react';
import PhotoBoothModal from './profile/photo-booth-modal';
import TrashLook from './profile/utils/trash-look';
import TrashLookTwo from './profile/utils/trash-look-two';
import TrashLookThree from './profile/utils/trash-look-three';
import TrashLookFour from './profile/utils/trash-look-four';
import TrashLookFive from './profile/utils/trash-look-five';
import TrashLookSix from './profile/utils/trash-look-six';
import TrashLookSeven from './profile/utils/trash-look-seven';
import EditInfo from './profile/edit-info';
import UserInfo from './profile/user-info';
import UserTitle from './profile/user-title';
const cookie = require('react-cookie')
const axios = require('axios');

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            age: null,
            age_pref_min: null,
            age_pref_max: null,
            is_male: null,
            seeking_male: null,
            look: null,
            lookTwo: null,
            lookThree: null,
            lookFour: null,
            lookFive: null,
            lookSix: null,
            lookSeven: null,
            matches: null,
        }
    }
    componentWillMount() {
        let removeScript = document.getElementById('main');
        document.body.removeChild(removeScript);
        const script = document.createElement("script");
        script.setAttribute("id", "main");
        script.src = "/src/public/js/script.js";
        script.async = true;
        document.body.appendChild(script);

        // Fetch user data prior to component mounting
        let user = cookie.load('user');
        console.log("this user is:", user._id + " " + user.email);

        if (user == undefined) {
            window.location.href = 'https://seemedate.herokuapp.com/login';
        } else {
            this.setState({
                firstName: user.firstName,
                age: user.age,
                age_pref_min: user.age_pref_min,
                age_pref_max: user.age_pref_max,
                is_male: user.is_male,
                seeking_male: user.seeking_male,
                look: user.looks[0] ? user.looks[0].link : "",
                lookTwo: user.looks[1] ? user.looks[1].link : "",
                lookThree: user.looks[2] ? user.looks[2].link : "",
                lookFour: user.looks[3] ? user.looks[3].link : "",
                lookFive: user.looks[4] ? user.looks[4].link : "",
                lookSix: user.looks[5] ? user.looks[5].link : "",
                lookSeven: user.looks[5] ? user.looks[5].link : "",
                matches: user.matches.length >= 1 ? user.matches.length : "0"
            })
        }
    }

    check() {

        if (window.location.href.indexOf("edit-info") > -1) {
            return (
                <EditInfo />
            );
        } else {
            return (
                <UserInfo firstName={this.state.firstName}
                    is_male={this.gender()} age={this.state.age}
                    seeking_male={this.seekingGender()}
                    age_pref_min={this.state.age_pref_min}
                    age_pref_max={this.state.age_pref_max}
                    look={this.state.look}
                    lookTwo={this.state.lookTwo}
                    lookThree={this.state.lookThree}
                    lookFour={this.state.lookFour}
                    lookFive={this.state.lookFive}
                    lookSix={this.state.lookSix}
                    matchCount={this.state.matches} />
            );
        }
    }
    gender() {
        let user = cookie.load('user');
        if (user.is_male === false) {
            return ("girl");
        } else if (user.is_male = true) {
            return ("guy");
        }
    }
    seekingGender() {
        let user = cookie.load('user');
        if (user.seeking_male === false) {
            return ("girl");
        } else if (user.seeking_male = true) {
            return ("guy");
        }
    }
    render() {

        return (
            <div className="profile-ct">
                <UserTitle firstName={this.state.firstName} age={this.state.age} />

                <div className="lookContainer">
                    <div className="look" onClick={() => { this.refs.v1.paused ? this.refs.v1.play() : this.refs.v1.pause() }}><video id="vid-look" ref="v1" className="video vid-look" src={this.state.look} />
                        {this.state.look ? <TrashLook remove={this.trashChange} /> : <PhotoBoothModal />}
                    </div>
                    <div className="look" onClick={() => { this.refs.v2.paused ? this.refs.v2.play() : this.refs.v2.pause() }}><video id="vid-look-two" ref="v2" className="video vid-look" src={this.state.lookTwo} />
                        {this.state.lookTwo ? <TrashLookTwo remove={this.trashTwoChange} /> : <PhotoBoothModal />}
                    </div>
                    <div className="look" onClick={() => { this.refs.v3.paused ? this.refs.v3.play() : this.refs.v3.pause() }}><video id="vid-look-three" ref="v3" className="video vid-look" src={this.state.lookThree} />
                        {this.state.lookThree ? <TrashLookThree remove={this.trashThreeChange} /> : <PhotoBoothModal />}
                    </div>
                    <div className="look" onClick={() => { this.refs.v4.paused ? this.refs.v4.play() : this.refs.v4.pause() }}><video id="vid-look-four" ref="v4" className="video vid-look" src={this.state.lookFour} />
                        {this.state.lookFour ? <TrashLookFour remove={this.trashFourChange} /> : <PhotoBoothModal />}
                    </div>
                    <div className="look" onClick={() => { this.refs.v5.paused ? this.refs.v5.play() : this.refs.v5.pause() }}><video id="vid-look-five" ref="v5" className="video vid-look" src={this.state.lookFive} />
                        {this.state.lookFive ? <TrashLookFive remove={this.trashFiveChange} /> : <PhotoBoothModal />}
                    </div>
                    <div className="look" onClick={() => { this.refs.v6.paused ? this.refs.v6.play() : this.refs.v6.pause() }}><video id="vid-look-six" ref="v6" className="video vid-look" src={this.state.lookSix} />
                        {this.state.lookSix ? <TrashLookSix remove={this.trashSixChange} /> : <PhotoBoothModal />}
                    </div>
                    <div className="look" onClick={() => { this.refs.v7.paused ? this.refs.v7.play() : this.refs.v7.pause() }}><video id="vid-look-seven" ref="v7" className="video vid-look" src={this.state.lookSeven} />
                        {this.state.lookSeven ? <TrashLookSix remove={this.trashSevenChange} /> : <PhotoBoothModal />}
                    </div>
                </div>
                {this.check()}
            </div>
        );
    }
    trashSevenChange() {
        this.setState({ lookSix: null })
        document.getElementById('vid-look-seven').classList.add('hide');
    }
    trashSixChange() {
        this.setState({ lookSix: null })
        document.getElementById('vid-look-six').classList.add('hide');
    }
    trashFiveChange() {
        this.setState({ lookFive: null })
        document.getElementById('vid-look-five').classList.add('hide');
    }
    trashFourChange() {
        this.setState({ lookFour: null })
        document.getElementById('vid-look-four').classList.add('hide');
    }
    trashThreeChange() {
        this.setState({ lookThree: null })
        document.getElementById('vid-look-three').classList.add('hide');
    }
    trashTwoChange() {
        this.setState({ lookTwo: null })
        document.getElementById('vid-look-two').classList.add('hide');
    }
    trashChange() {
        this.setState({ look: null })
        document.getElementById('vid-look').classList.add('hide');
    }
};

export default Profile;