import React, { Component } from 'react';
import { Link } from 'react-router';
import chatWindow from '../chat/chatWindow';
const axios = require('axios');
const cookie = require('react-cookie');

const MatchList = React.createClass({

getInitialState: function() {
  return { 
    chatWindows: [],
    matches: []
  }
},

componentWillMount: function() {
    let url='http://localhost:3000/api/matches';
    let token = cookie.load('token');
    let user = cookie.load('user');
    if (user !== undefined) {
    axios.post(url, 
      { id: user._id }, 
      { headers: { Authorization: token }
    }).then((res)=>{ 
        console.log(res.data)
        this.setState({
          matches: res.data
        });
    }).catch((err)=> {
      console.log(err)
    });
    }
  },

  renderList: function() {
    let user = cookie.load('user');
    if (user !==undefined) {
      return (
        <div className="match-list-container">
            {this.state.matches.map(item=>(
              <div className="match">
                  <Link onClick={this.handleClick.bind(this)} firstName={item.firstName}> {item.firstName} </Link>
                  <div className="image" />
              </div>
            ))}
        </div>);
    } else {
      return (<div className="empty"/>)
    }
  },

  handleClick: function(e) {
    e.preventDefault();
      this.setState({chatWindows: this.state.chatWindows.concat(
        [{
          user1: "what de fuck"
        }]
      )});
      console.log(this.state.chatWindows);
      this.mapChats();
  },
  
  mapChats: function() {
    let user = cookie.load('user');
    if (user !== undefined) {
      this.state.chatWindows.map(item=>{
       return (<chatWindow user1={item.user1} />)
        //set IDs as props here as well.
      })
    } else {
      return false;
    }
  },

  render: function() {
    return (
      <div>
        {this.renderList()}
        {this.mapChats()}
     </div>
    );
  }
})

module.exports = MatchList;