import React, { Component } from 'react';
import HeaderTemplate from './template/header';
import FooterTemplate from './template/footer';
import MatchList from './template/match-list';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderTemplate logo="seemē" />
        <MatchList />
        <div className="user-container">
          {this.props.children}
        </div>

        <FooterTemplate />
      </div>
    );
  }
}

export default App;
