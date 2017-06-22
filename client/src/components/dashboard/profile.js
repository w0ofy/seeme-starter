const cookie = require('react-cookie')
const axios = require('axios');
const React = require('react');
const EditInfo = require('./profile/edit-info');
const UserInfo = require('./profile/user-info');

const Profile = React.createClass({
    componentWillMount() {
        // Fetch user data prior to component mounting
        const user = cookie.load('user');
        console.log(user);
        if (user == undefined) {
            window.location.href = 'http://localhost:3000/login';
        } else {
            const userId = user._id;

            this.setState({
                firstName: user.firstName,
                lastInitial: user.lastInitial,
                age: user.age,
                age_pref_min: user.age_pref_min,
                age_pref_max: user.age_pref_max,
                is_male: user.is_male,
                seeking_male: user.seeking_male,
            })
        }
        // // console.log("userID", userId);
        // function fetchMyProfile(uid) {

        //     axios.get(`${API_URL}/user/${uid}`, {
        //         headers: { Authorization: cookie.load('token') },
        //     })
        //         .then((response) => {
        //             console.log("response:", response)
        //         })
        //         .catch((err) => {
        //             console.log("error", err)
        //         });

        // }
    },

    // check() {

    //     if (window.location.href.indexOf("edit-info") > -1) {
    //         return (
    //             <EditInfo firstName={this.state.firstName} lastInitial={this.state.lastInitial} email={this.state.email} age={this.state.age} age_pref_min={this.state.age_pref_min} age_pref_max={this.state.age_pref_max} profile_look={this.state.profile_look} />
    //         );
    //     } else {
    //         return (
    //             <UserInfo firstName={this.state.firstName} lastInitial={this.state.lastInitial} email={this.state.email} age={this.state.age} age_pref_min={this.state.age_pref_min} age_pref_max={this.state.age_pref_max} profile_look={this.state.profile_look} />
    //         );
    //     }
    // },

    render: function () {
        return (
            <div>
                <div className="lookContainer">
                    <span className="look"></span>
                    <span className="look"></span>
                    <span className="look"></span>
                    <span className="look"></span>
                    <span className="look"></span>
                    <span className="look"></span>
                </div>
                <UserInfo firstName={this.state.firstName} lastInitial={this.state.lastInitial} is_male={this.state.is_male} age={this.state.age} age_pref_min={this.state.age_pref_min} age_pref_max={this.state.age_pref_max} profile_look={this.state.profile_look} />
            </div>
        );
    }
})

module.exports = Profile;