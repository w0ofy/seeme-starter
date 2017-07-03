const React = require('react');
const cookie = require('react-cookie');

const ListShadow = React.createClass({
  renderShadow() {
    let user = cookie.load('user');
    if (user !== undefined) {
      return(
        <div className="list-shadow"></div>
        
      )
    } else {
      return (
        <div></div>
      )
    }
},
  render: function () {
    return (
      <div>
        {this.renderShadow()}
      </div>
    );
  }
})

module.exports = ListShadow;