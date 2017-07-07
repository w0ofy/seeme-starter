const axios = require('axios');
const React = require('react');
const cookie = require('react-cookie');
const User = cookie.load('user');

class Chat extends React.Component {  
    
    constructor(props) { 
        super(props) 
            this.state = { 
                chatHistory: [],
                input: '',
                messages: ''
            } 
    }
    
    componentWillMount() { 
    }
     

    render() {
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
                    <textarea /*onChange={this.handleChange("message")}*/ className="form-control" id="messageInput" rows="3" placeholder='Enter Message Here'></textarea>
                </div>
            </div>
        );
    }
};


module.exports = Chat;