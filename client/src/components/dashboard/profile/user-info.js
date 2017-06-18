import React, { Component } from 'react';

class UserInfo extends Component {
  render() {
    return (
      <div className="user-info">
        {this.props.profile}
      </div>
    );
  }
}

export default UserInfo;
