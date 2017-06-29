const cookie = require('react-cookie')
const axios = require('axios');
const React = require('react');


const Swipe = React.createClass({
    componentWillMount() {
        // Fetch user data prior to component mounting
        let user = cookie.load('user');
        const token = cookie.load('token');
        const url = 'http://localhost:3000/api/all-users';
        let allUsers = null;
        axios.get(url, { headers: { Authorization: token } })
            .then((response) => {
                console.log("helllloooo")
                allUsers = response.data;
                console.log("allusers: ", response.data)
            })
            .catch((error) => {
                throw error;
            });

    },

    render: function () {

        return (
            <div className="wrap">
                <div id="tinderslide" className="">
                    <ul>
                        <li className="pane1">
                            <div className="img">
                                <video id="recorded-video" className="video" preload="true" src="" />
                            </div>
                            <div id="" className="first-name"></div>
                            <div className="like"></div>
                            <div className="dislike"></div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = Swipe;