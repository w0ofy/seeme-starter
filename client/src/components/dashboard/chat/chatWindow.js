const axios = require('axios');
const React = require('react');
const cookie = require('react-cookie');
const currentUser = cookie.load('user');

const chatWindow = React.createClass({
  render: function() {
    return (
        <div id="chat">
            <div className="input-group input-group-lg">
            <span classNmae="input-group-addon" id="sizing-addon1"><span className="glyphicon glyphicon-user" aria-hidden="true"></span></span>
            <input type="text" className="form-control" id = "userName" placeholder="No User" aria-describedby="sizing-addon1"> 
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
            <textarea className="form-control" id="messageInput" rows="3" placeholder = 'Enter Message Here'></textarea>
            </div> 
            <div className="well well-sm">
            <div className="chatStatus">Status:<span id = 'state'>idle</span>
            </div>
        </div>
    );
  };
});
module.exports = chatWindow

