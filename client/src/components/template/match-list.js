import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class MatchList extends Component {

  renderList() {
    if (this.props.authenticated) {
      return  [<div className="match-list-container">
        <div className="match">
          <Link to="#">react</Link> |
          <Link to="#">chat</Link>
          <div className="image" />
        </div>
        <div className="match">
          <Link to="#">react</Link> |
          <Link to="#">chat</Link>
          <div className="image" />
        </div>
        <div className="match">
          <Link to="#">react</Link> |
          <Link to="#">chat</Link>
          <div className="image" />
        </div>
        <div className="match">
          <Link to="#">react</Link> |
          <Link to="#">chat</Link>
          <div className="image" />
        </div>
      </div>]
    } else {
      return [<div className="empty" />]
    } 
  }
  
  render() {
    return (
      <div>
     {this.renderList()}
     </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}
export default connect(mapStateToProps)(MatchList);