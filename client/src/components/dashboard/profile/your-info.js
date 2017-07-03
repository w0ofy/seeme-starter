
const React = require('react');
import { Link } from 'react-router';

const YourInfo = React.createClass({
  renderForGender() {
    if (this.props.is_male === "guy") {
      return (
        <div className="user-info-text">
          <h2>Hi, my name is {this.props.firstName}! I am one handsome {this.props.age} year old {this.props.is_male}. Want to seeme?</h2>
        </div>
      )
    } else if (this.props.is_male === "girl") {
      <div className="user-info-text">
          <h2>Hi, my name is {this.props.firstName}! I am a simply beautiful {this.props.age} year old {this.props.is_male}. Want to seeme?</h2>
        </div>
    }
  },
  render() {
    return (
      <div className="user-info">
        {this.renderForGender()}        
      </div>
    );
  }
})

module.exports = YourInfo;