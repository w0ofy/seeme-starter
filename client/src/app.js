import React, { Component } from 'react';
import HeaderTemplate from './components/template/header';
import FooterTemplate from './components/template/footer';
import ListShadow from './components/template/list-shadow';
import MatchList from './components/template/match-list';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Typekit from 'react-typekit';

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
