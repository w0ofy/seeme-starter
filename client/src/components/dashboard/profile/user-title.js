
const React = require('react');
import { Link } from 'react-router';
import MdSettings from 'react-icons/lib/md/settings';
const UserTitle = React.createClass({
  render() {
    return (
      <div className="user-title">
        <div className="user-title-text">
          <h3>{this.props.firstName}, {this.props.age} <Link to="edit-info"><MdSettings /></Link></h3>          
        </div>
        
      </div>
    );
  }
})

module.exports = UserTitle;