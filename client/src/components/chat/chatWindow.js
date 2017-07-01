const axios = require('axios');
const React = require('react');
const cookie = require('react-cookie');
const currentUser = cookie.load('user');
// const messageInput = $('#messageInput');
// const chatHistory = $('.chatHistory');
const logged_in_user = currentUser; 
const userName = {};
userName.value = logged_in_user.firstName;
console.log(userName.value);

const chatWindow = React.createClass({

    getInitialState: function () {
        return {
        user: userName.value,
        recipent:"",
        message:"",
        is_online: "",
        }
    },

    handleChange: function (key) {
        return function (e) {
        let state = {};
        state[key] = e.target.value;
        this.setState(state);
        }.bind(this);
    },
    
    // updateScroll: function() {
    //     var panel = document.getElementById("chatWindow");
    //     panel.scrollTop = panel.scrollHeight;
    // },       
    
    // componentWillMount: function() { 
    //     if(data.length){
    //     //Loops through data and writes to the page
    //         for(var i = 0; i < data.length; i++){
    //             //creates page element for each message
    //             if ( data[i].name === userName.value){
    //                 var message = $('<div>');
    //                 message.addClass('yourMessage');
    //                 message.html('<h3><span class="label label-default" id = "yourWords">'+ data[i].message + '</span></h3>');
    //                 chatHistory.append(message);
    //                 message.insertBefore(chatHistory).firstChild;
    //             }else{
    //                 var message = $('<div>');
    //                 message.addClass('theirMessage');
    //                 message.html('<h3><span class="label label-default" id = "theirWords">'+ data[i].message + '</span></h3>');
    //                 chatHistory.append(message);
    //                 message.insertBefore(chatHistory).firstChild;   
    //             };
    //         };
    //     }
    // },
  
  render: function() {
    return (
        <div id="chat">
            <div className="input-group input-group-lg">
            <span className="input-group-addon" id="sizing-addon1"><span className="glyphicon glyphicon-user" ariaHidden="true"></span></span>
            <input type="text" className="form-control" id = "userName" placeholder="No User" ariaDescribedBy="sizing-addon1" /> 
            </div>
            <div className="panel panel-default" id ='chatWindow'>
                <div className="panel-heading">
                    <h3 className="panel-title">Chat History</h3>
                </div>
                <div className="panel-body">
                <div className="chatHistory"></div>
                </div>
            </div>
            <div className="form-group">
            <textarea onChange={this.handleChange("message")} className="form-control" id="messageInput" rows="3" placeholder = 'Enter Message Here'></textarea>
            </div> 
            <div className="well well-sm">
            <div className="chatStatus">Status:<span id = 'state'>idle</span></div>
            </div>
        </div>
    );
  }
});

module.exports = chatWindow;

