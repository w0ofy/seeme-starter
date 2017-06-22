
const React = require('react');
const Link = require('react-router');

const UserInfo = React.createClass({
  render() {
    return (
      <div className="user-info">
        <div className="edit-container">
          <Link to="/edit-info">edit profile</Link>
        </div>
        <div className="user-info-text">
          <h5>{this.props.firstName} {this.props.lastInitial}</h5>
          <h5>{this.props.email}</h5>
          <h5>{this.props.age}</h5>
          <h5>{this.props.age_pref_min} to {this.props.age_pref_max}</h5>
        </div>
      </div>
    );
  }
})

module.exports = UserInfo;