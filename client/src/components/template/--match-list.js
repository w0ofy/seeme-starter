import React, { Component } from 'react';
import { Link } from 'react-router';
import chatWindow from '../chat/chatWindow'
const axios = require('axios');
const cookie = require('react-cookie');

const MatchList = React.createClass({

  getInitialState: function() {
    return ({ 
      chatWindows: [],
      matches: []
    })
  },

componentWillMount: function() {
  let url = 'http://localhost:3000/api/matches',
      user = cookie.load('user'),
      token = cookie.load('token');
  if (user !== undefined){
    axios.post(url, 
      { id: user._id }, 
      { headers: { Authorization: token }
    }).then((res)=>{ 
        console.log(res)
        // this.setState({
        //   matches: res
        // });
    });
  }
},

  renderList: function() {
    let user = cookie.load('user');
    if (user !== undefined) {
      return (
      <div className="match-list-container">
        {/*{this.state.matches.map((item)=>(
          <div className="match">
            <span onClick={this.openChat} firstName={item}> {item} </span>
            <div className="image" />
          </div>
        ))}*/}
      </div>
      );
    } else {
      return (<div className="empty" />)
    } 
  },

  openChat: function(e) {
    e.preventDefault();
    let user = cookie.load('user');
    // if (user !==undefined) {
    //   this.state.chatWindows.concat({
    //     user1: user.firstName,
    //     user2: e.target.firstName
    //     //get IDs as well
    //   })
    // }
  },
  
  render: function() {
    return (
      <div>
     {this.renderList()}
     {/*{this.state.chatWindows.map((item) => (
       <chatWindow user1={item.user1} user2={item.user2} />
       //set IDs as props here as well.
     ))}*/}
     </div>
    );
  }
})

module.exports = MatchList;