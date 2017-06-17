import React, { Component } from 'react';

class UserInfo extends Component {
  render() {
    return (
      <div>
        {this.props.user}
      </div>
    );
  }
}

export default UserInfo;
