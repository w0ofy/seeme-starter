import React, { Component } from 'react';

class editProfile extends Component {
    render() {
        return (
            <div className="edit-profile">
                <form name="editProfile" action="editprofile">
                    <input name="name" type="text">{this.props.firstName} {this.props.lastInitial}</input>
                    <input name="email" type="text">{this.props.email}</input>
                    <input name="age" type="text">{this.props.age}</input>
                    <input name="ageprefmin" type="text">{this.props.age_pref_min}</input>
                    <input name="ageprefmax" type="text">{this.props.age_pref_max}</input>
                </form>
            </div>
        );
    }
}

export default editProfile;
