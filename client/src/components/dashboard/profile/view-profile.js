import React, { Component } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { fetchUser } from '../../../actions/index';

import UserInfo from './user-info';

class ViewProfile extends Component {
  componentWillMount() {
    // Fetch user data prior to component mounting
    // uid === UNDEFINED   WTFFFFFFFFFFF
    const user = cookie.load('user');
    const userId = user._id;
    console.log("userID", userId);
    this.props.fetchUser(userId);
  }

  render() {
    return (
      <UserInfo profile={this.props.email} />
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}

export default connect(mapStateToProps, { fetchUser })(ViewProfile);
