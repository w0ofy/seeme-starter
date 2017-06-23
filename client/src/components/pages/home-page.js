import React, { Component } from 'react';
import Register from '../auth/register'
class HomePage extends Component {
  render() {
    return (
      <div>
        <div className="title">
          <h2>read less. see more.</h2>
          <h2>we help you seemē, the real mē</h2>
        </div>
        <Register />
      </div>
    );
  }
}

export default HomePage;
