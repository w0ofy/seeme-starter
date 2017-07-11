const axios = require('axios');
const React = require('react');
const cookie = require('react-cookie');

// import io from 'socket.io-client';
// const socket = io.connect('http://localhost:3000/')

const ChatWindow = React.createClass({

    getInitialState: function () {
        return {
            user: this.props.user1,
            recipent: this.props.user2,
            message: "",
            is_online: "",
            chathistory: []
        }
    },

    handleChange: function (key) {
        return function (e) {
            let state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);
    },
    handleSendMessage(e) {
        e.preventDefault();
        let user = cookie.load('user');
        let token = cookie.load('token');
        const that = this;
        const url = 'http://localhost:3000/api/create-message'

        axios.put(url, { senderId: user._id, receiverId: this.props.user2, message: that.state.message, }, { headers: { Authorization: token } }).then(res => {
            console.log(res.data.chats)
        });
    },
    componentWillMount: function () {
        // let user = cookie.load('user');
        // if (user === undefined) {
        //     return false;
        // }
    },

    render: function () {

        return (
            <div id="chat">
                <div className="input-group input-group-lg">
                </div>
                <div className="panel panel-default" id='chatWindow'>
                    <div className="panel-body">
                        <div className="chatHistory">

                        </div>
                    </div>
                </div>
                <div className="form-group">

                    <form onSubmit={this.handleSendMessage}>
                        <textarea onChange={this.handleChange("message")} className="form-control" id="messageInput" rows="3" placeholder="Enter Message Here" />
                        <input type="submit" value="Send" />
                    </form>
                </div>
            </div>
        );
    }
});


module.exports = ChatWindow;