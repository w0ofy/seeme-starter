import React, { Component } from 'react';
import HeaderTemplate from './template/header';
import FooterTemplate from './template/footer';
import MatchList from './template/match-list';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderTemplate logo="seemē" />
        <MatchList />

        <CSSTransitionGroup
          transitionName='fade'
          transitionAppear={false}
          transitionEnter={true}
          transitionLeave={true}
          transitionEnterTimeout={200}
        >

          <div key={1} className="user-container">
            {this.props.children}
          </div>
          
        </CSSTransitionGroup>
        <FooterTemplate />
      </div>
    );
  }
}

export default App;
