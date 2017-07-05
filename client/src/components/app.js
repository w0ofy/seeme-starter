import React, { Component } from 'react';
import HeaderTemplate from './template/header';
import FooterTemplate from './template/footer';
import ListShadow from './template/list-shadow';
import MatchList from './template/match-list';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Typekit from 'react-typekit';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class App extends Component {
  render() {
    const page = this.props.location.pathname.substr(1);
    return (
      <div>
        <HeaderTemplate logo="seemē" />
        <ListShadow />
        <MatchList />

        <ReactCSSTransitionGroup transitionName="fade">
        
          <div className="user-container">
           {React.cloneElement(this.props.children, {key: page})}
          </div>
          
        </ReactCSSTransitionGroup>
        <FooterTemplate />
        <Typekit kitId="khm7xtw" />
      </div>
    );
  }
}

export default App;
