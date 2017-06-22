
const React = require('react');
import { Link } from 'react-router';

const UserInfo = React.createClass({
  render() {
    return (
      <div className="user-info">
        <div className="edit-container">
          <Link to="edit-info">edit profile</Link>
        </div>
        <div className="user-info-text">
          <h3>{this.props.firstName} {this.props.lastInitial}</h3>
          <h3>{this.props.is_male}</h3>
          <h3>{this.props.age}</h3>
          <h3>{this.props.age_pref_min} to {this.props.age_pref_max}</h3>
        </div>
      </div>
    );
  }
})

module.exports = UserInfo;