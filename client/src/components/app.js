import React, { Component } from 'react';
import HeaderTemplate from './template/header';
import FooterTemplate from './template/footer';
import MatchList from './template/match-list';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class App extends Component {
  render() {
    const page = this.props.location.pathname.substr(1);
    return (
      <div>
        <HeaderTemplate logo="seemē" />
        <MatchList />

        <CSSTransitionGroup
          transitionName='fade'
          transitionAppear={true}
          transitionEnter={true}
          transitionLeave={true}
          transitionEnterTimeout={200}
        >
        
          <div className="user-container">
           {React.cloneElement(this.props.children, {key: page})}
          </div>
          
        </CSSTransitionGroup>
        <FooterTemplate />
      </div>
    );
  }
}

export default App;
