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
    return (
      <div>
        <HeaderTemplate logo="seemē" />
        <ListShadow />
        <MatchList />
        
          <div className="user-container">
           {this.props.children}
          </div>

        <FooterTemplate />
        <Typekit kitId="khm7xtw" />
      </div>
    );
  }
}

export default App;
