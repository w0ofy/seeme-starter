import React, { Component } from 'react';
// import InputRange from 'react-input-range';

class EditInfo extends Component {

    render() {
        return (
            <div className="edit-info">
                <form id="edit-info" name="editInfo" action="editInfo">
                    <input name="name" type="text" value={this.props.firstName} />
                    <input name="email" type="text" value={this.props.email} />
                    <input name="age" type="text" value={this.props.age} />
                    <input id="min" className="inline" name="ageprefmin" type="text" value={this.props.age_pref_min} />
                    <input id="max" className="inline" name="ageprefmax" type="text" value={this.props.age_pref_max} />
                    <input name="saveprofile" type="submit" value="save" />
                </form>
            </div>
        );
    }
}

export default EditInfo;
