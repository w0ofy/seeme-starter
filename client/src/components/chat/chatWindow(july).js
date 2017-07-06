const axios = require('axios');
const React = require('react');
const cookie = require('react-cookie');
const User = cookie.load('user');
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3000/')
const messageInput = $('#messageInput');
const chatHistory = $('.chatHistory');
const displayName = $('#userName');
const name = User.firstName;
const ID = User._id;
console.log(name, ID, User.logged_in);

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
        socket.on('connect', () => {
            console.log(socket.id)
        });
    }
     

    render() {
        return (
            <div>
                
                <input type="text" className="form-control" id = "recpientName" value = {this.state.recipent_name}/> 
                
                <div className="panel panel-default" id ='chatWindow'>
                    <div className="panel-heading">
                        <h3 className="panel-title"></h3>
                    </div>
                    <div className="panel-body">
                        {this.state.chatHistory.map((data) => {
                            if ( data[i]._id == this.state.user_id){
                                return (<h3><span className="label label-default" id = "yourWords">{data.message}</span></h3>)    
                            }else{
                                return (<h3><span className="label label-default" id = "theirWords">{data.message}</span></h3>)
                            };
                        })}
                    </div>
                </div>
                
                <div className="form-group">
                    <textarea onKeyPress={this.handleKeyPress} className="form-control" id="messageInput" rows="3" value = {this.state.input}>
                    </textarea>
                </div> 
            
            </div>
        );
    }
};


module.exports = Chat;