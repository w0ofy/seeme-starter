import React, { Component } from 'react';
import Login from '../auth/login'
class HomePage extends Component {
  render() {
    return (
      <div className="title">
      <h2>read less. say less.</h2>
      <h1>seemē.</h1>
      <Login />
      </div>
    );
  }
}

export default HomePage;
