
const React = require('react');
import { Link } from 'react-router';

const YourInfo = React.createClass({
  render() {
    return (
      <div className="user-info">
        <div className="edit-container">
          <Link to="edit-info">edit profile</Link>
        </div>
        <div className="user-info-text">
          <h2>Hi, my name is {this.props.firstName}! I am one handsome {this.props.age} year old {this.props.is_male}. Want to seeme?</h2>
        </div>
      </div>
    );
  }
})

module.exports = YourInfo;