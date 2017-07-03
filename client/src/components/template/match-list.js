const React = require('react');
import { Link } from 'react-router';
const chatWindow = require('../chat/chatWindow');
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
            matches: res
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
              <Link to={urlId}>{item.firstName}</Link>
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
      this.setState({chatWindows: this.state.chatWindows.concat(
        [{
          user1: "what de fuck"
        }]
      )});
      console.log(this.state.chatWindows);
      this.mapChats();
  },

  mapChats: function () {
    
      this.state.chatWindows.map((item) => {
        console.log("IIIITTTEEMMMM", item);
        return (<chatWindow user1={item.user1} />)
        //set IDs as props here as well.
      })
    
  },

  render: function () {
    return (
      <div>
        {this.renderList()}
        {this.mapChats()}
      </div>
    );
  }
})

module.exports = MatchList;