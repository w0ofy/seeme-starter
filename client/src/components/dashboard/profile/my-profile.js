import React, { Component } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { fetchMyProfile } from '../../../actions/index';

import EditInfo from './edit-info';
import UserInfo from './user-info';


class MyProfile extends Component {
    componentWillMount() {
        // Fetch user data prior to component mounting
        // uid === UNDEFINED   WTFFFFFFFFFFF
        const user = cookie.load('user');
        const userId = user._id;
        console.log("userID", userId);
        this.props.fetchMyProfile(userId);
    }

    checkForEditProfile() {

        if (window.location.href.indexOf("edit-info") > -1) {
            return (
                <EditInfo firstName={this.props.profile.firstName} lastInitial={this.props.profile.lastInitial} email={this.props.profile.email} age={this.props.profile.age} age_pref_min={this.props.profile.age_pref_min} age_pref_max={this.props.profile.age_pref_max} profile_look={this.props.profile.profile_look} />
            );
        } else {
            return (
                <UserInfo firstName={this.props.profile.firstName} lastInitial={this.props.profile.lastInitial} email={this.props.profile.email} age={this.props.profile.age} age_pref_min={this.props.profile.age_pref_min} age_pref_max={this.props.profile.age_pref_max} profile_look={this.props.profile.profile_look} />
            );
        }
    }

    render() {
        return (
            <div>
                <div className="lookContainer">
                    <span className="look">{this.props.profile_look}</span>
                    <span className="look">{this.props.profile_look}</span>
                    <span className="look">{this.props.profile_look}</span>
                    <span className="look">{this.props.profile_look}</span>
                    <span className="look">{this.props.profile_look}</span>
                    <span className="look">{this.props.profile_look}</span>
                </div>
                {this.checkForEditProfile()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        profile: state.user.profile,
    };
}

export default connect(mapStateToProps, { fetchMyProfile })(MyProfile);
