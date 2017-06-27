const cookie = require('react-cookie')
const axios = require('axios');
const React = require('react');
import Swipeable from 'react-swipeable'

const Swipe = React.createClass({
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
                lastInitial: user.lastInitial,
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
    
    swiping(e, deltaX, deltaY, absX, absY, velocity) {
        console.log('Swiping...', e, deltaX, deltaY, absX, absY, velocity)
    },

    swiped(e, deltaX, deltaY, isFlick, velocity) {
        console.log('Swiped...', e, deltaX, deltaY, isFlick, velocity)
    },
    check() {

        console.log(window.location.href.indexOf("edit-info"));

        if (window.location.href.indexOf("edit-info") > -1) {
            return (
                <EditInfo firstName={this.state.firstName}
                    lastInitial={this.state.lastInitial}
                    is_male={this.state.is_male} age={this.state.age}
                    seeking_male={this.state.seeking_male}
                    age_pref_min={this.state.age_pref_min}
                    age_pref_max={this.state.age_pref_max}
                    profile_look={this.state.profile_look} />
            );
        } else {
            return (
                <UserInfo firstName={this.state.firstName}
                    lastInitial={this.state.lastInitial}
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
            );
        }
    },
    render: function () {

        return (
            <div>
                <Swipeable
                    onSwiping={this.swiping}
                    onSwiped={this.swiped} >
                    You can swipe here!
                </Swipeable>
            </div>
        );
    }
});

module.exports = Swipe;