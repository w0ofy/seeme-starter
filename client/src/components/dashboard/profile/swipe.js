const cookie = require('react-cookie')
const axios = require('axios');
import React from 'react';


class Swipe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }
    componentWillMount() {
        const token = cookie.load('token');
        const url = 'http://localhost:3000/api/all-users';
        axios.get(url, { headers: { Authorization: token } })
            .then(res => {
                console.log(res.data.users);
                const users = res.data.users
                this.setState({ users });
            });
    }
    render() {

        return (
            <div>
            <div className="wrap">
                <div id="tinderslide" className="">
                    <ul>
                        {this.state.users.map(function (user) {
                            console.log('user::: ', user);
                            return (<Pane key={user._id} age={user.age} link={user.looks[0].link} name={user.firstName} />)
                        })}
                    </ul>
                </div>
            </div>
            <div class="actions">
                <a href="#" className="dislike"><i></i></a>
                <a href="#" className="like"><i></i></a>
            </div>
            </div>
        );
    }
};

const Pane = React.createClass({
    render: function () {
        return (
            <div>
                <li className="pane1">
                    <div className="img">
                        <video id="recorded-video" className="video" reload="true" src={this.props.link} />
                    </div>
                    <div id={this.props.id} className="first-name">
                        {this.props.name}, {this.props.age}
                    </div>
                    <div className="like"></div>
                    <div className="dislike"></div>
                </li>
            </div>
        );
    }
});

module.exports = Swipe;