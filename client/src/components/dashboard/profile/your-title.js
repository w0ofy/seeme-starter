
const React = require('react');

const YourTitle = React.createClass({
  render() {
    return (
      <div className="user-title">
        <div className="user-title-text">
          <h3>{this.props.firstName}, {this.props.age}</h3>          
        </div>
        
      </div>
    );
  }
})

module.exports = YourTitle;