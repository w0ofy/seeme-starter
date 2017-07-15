import React, { Component } from 'react';
import { Link } from 'react-router';
import MdSettings from 'react-icons/lib/md/settings';

class UserTitle extends React.Component {
  render() {
    return (
      <div className="user-title">
        <div className="user-title-text">
          <h3>{this.props.firstName}, {this.props.age} <Link to="edit-info"><MdSettings /></Link></h3>
        </div>

      </div>
    );
  }
};

export default UserTitle;