
import React, { Component } from 'react';

class YourTitle extends React.Component {
  render() {
    return (
      <div className="user-title">
        <div className="user-title-text">
          <h3>{this.props.firstName}, {this.props.age}</h3>          
        </div>
        
      </div>
    );
  }
};

export default YourTitle;