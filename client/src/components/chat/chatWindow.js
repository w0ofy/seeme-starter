const axios = require('axios');
const React = require('react');
const cookie = require('react-cookie');

const ChatWindow = React.createClass({

    getInitialState: function () {
        return {
            user: this.props.user1,
            recipent: this.props.user2,
            message: "",
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

    componentWillMount: function () {
        console.log("yo")
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
                    <textarea onChange={this.handleChange("message")} className="form-control" id="messageInput" rows="3" placeholder='Enter Message Here'></textarea>
                </div>
            </div>
        );
    }
});

module.exports = ChatWindow;


            // <div id="chat">
            //     <div className="input-group input-group-lg">
            //         <span className="input-group-addon" id="sizing-addon1"><span className="glyphicon glyphicon-user" ariaHidden="true"></span></span>
            //         <input type="text" className="form-control" id="userName" placeholder="No User" ariaDescribedBy="sizing-addon1" />
            //     </div>
            //     <div className="panel panel-default" id='chatWindow'>
            //         <div className="panel-heading">
            //             <h3 className="panel-title">Chat History</h3>
            //         </div>
            //         <div className="panel-body">
            //             <div className="chatHistory">
            //                 <div className="chatStatus">Status:<span id='state'>idle</span></div>
            //             </div>
            //         </div>
            //     </div>
            //     <div className="form-group">
            //         <textarea onChange={this.handleChange("message")} className="form-control" id="messageInput" rows="3" placeholder='Enter Message Here'></textarea>
            //     </div>
            // </div>