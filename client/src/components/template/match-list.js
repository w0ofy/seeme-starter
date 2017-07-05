import React, { Component } from 'react';
import { Link } from 'react-router';
import chatWindow from '../chat/chatWindow';
const axios = require('axios');
const cookie = require('react-cookie');

const MatchList = React.createClass({


  getInitialState: function () {
    return ({
      chatWindows: [],
      matches: []
    })
  },

  componentWillMount: function () {
    let user = cookie.load('user');

    if (user !== undefined){
      let url='http://localhost:3000/api/matches';
      let token = cookie.load('token');
      axios.post(url, 
        { id: user._id }, 
        { headers: { Authorization: token }
      }).then((res)=>{ 
          console.log(res)
          this.setState({
            matches: res.data
          });
      }).catch((err)=> {
        console.log(err)
      });
    } else {
      return false;
    }
  },

  renderList: function () {
    let user = cookie.load('user');
    if (user !== undefined) {
      return (
        <div className="match-list-container">
          {this.state.matches.map((item) => {
            // console.log(item);
            let urlId = 'http://localhost:8080/see/' + item._id;
            return (
              
            <div className="match">
              <Link to={urlId}>{item.firstName}</Link> | 
              <span id={item._id} onClick={this.openChat.bind(this)}> Chat</span>
              <div className="image" />
            </div>)
          })}
        </div>);
    } else {
      return (<div className="empty" />)
    }
  },

  openChat: function (e) {
    e.preventDefault();
    let user = cookie.load('user');
    let Match = e.target.id
      this.setState({chatWindows: this.state.chatWindows.concat(
        [{
          UID: user._id,
          MatchID: Match
        }]
      )});
  },


  // mapChats: function () {
    
  //     this.state.chatWindows.map((item) => {
  //       console.log(item)
  //       return (<chatWindow user1={item.UID} user2={item.MatchID} />)
  //     })
    
  // },

  render: function () {
    return (
      <div>
        {this.renderList()}
        {this.state.chatWindows.map((item) => {
          console.log(item)
          return (<chatWindow user1={item.UID} user2={item.MatchID} />)
        })}
      </div>
    );
  }
})

module.exports = MatchList;