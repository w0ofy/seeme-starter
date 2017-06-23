import React, { Component } from 'react';
import Register from '../auth/register'
class HomePage extends Component {
  render() {
    return (
      <div>
        <div className="title">
          <h2>We help you seemē. The REAL mē.</h2>
          <h4>Swipe on 10s profile videos - understand a little better who you're "liking". The days of reading profiles are gone - Your profile comes to life by showing the real him or her, the real you. Meet new people nearby. See more of what you're signing up for. Simply, seemē.</h4>
        </div>
        <Register />
      </div>
    );
  }
}

export default HomePage;
