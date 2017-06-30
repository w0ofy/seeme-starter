const cookie = require('react-cookie')
const axios = require('axios');
import React from 'react';


class Swipe extends React.Component {
    constructor(props) {
        super(props);
        let userCookie = cookie.load('user');
        this.state = {
            thisuser: userCookie,
            users: [],
            loggedInUsersId: userCookie._id
        };
        this.handleLikeClick = this.handleLikeClick.bind(this);
        this.handleDislikeClick = this.handleDislikeClick.bind(this);
    }
    handleLikeClick(e) {
        e.preventDefault();
        const userCookie = cookie.load('user');
        const token = cookie.load('token');
        const url = 'http://localhost:3000/api/liking'
        let beingSwiped = $('#tinderslide ul div:last-child');

        beingSwiped.animate('transform', 'translateX(900px)');
        let liked = this.state.users.pop()

        console.log('likingid:', liked._id);
        axios.put(url, {
            emailQuery: userCookie.email,
            uid: userCookie._id,
            likedId: liked._id
        }, { headers: { Authorization: token } })
            .then(res => {
                cookie.save('token', res.data.token, { path: '/' });
                cookie.save('user', res.data.user, { path: '/' });
                console.log(res)
            });

        beingSwiped.remove();
    }
    handleDislikeClick(e) {
        e.preventDefault();
        const userCookie = cookie.load('user');
        const token = cookie.load('token');
        const url = 'http://localhost:3000/api/disliking'
        let beingSwiped = $('#tinderslide ul div:last-child');

        beingSwiped.animate('transform', 'translateX(900px)');
        let disliked = this.state.users.pop()

        axios.put(url, {
            uid: userCookie._id,
            dislikedId: disliked._id
        }, { headers: { Authorization: token } })
            .then(res => {
                cookie.save('token', res.data.token, { path: '/' });
                cookie.save('user', res.data.user, { path: '/' });
                console.log(res)
            });

        beingSwiped.remove();
    }
    handleVideoClick(e) {
        e.preventDefault();
        this.click(function () { this.video.paused ? this.video.play() : this.video.pause(); });
    }
    componentWillMount() {
        const userCookie = cookie.load('user'),
            token = cookie.load('token'),
            url = 'http://localhost:3000/api/all-users',
            likedids = [],
            dislikedids = [];
        if (userCookie.liked_ids) {
            for (let i = 0; i < userCookie.liked_ids.length; i++) {
                likedids.push(userCookie.liked_ids[i].id);
            }
        }

        if (userCookie.disliked_ids) {
            for (let i = 0; i < userCookie.disliked_ids.length; i++) {
                dislikedids.push(userCookie.disliked_ids[i].id);
            }
        }
        if (userCookie.is_male === false) {

        }
        axios.put(url, { id: userCookie._id, liked: likedids, disliked: dislikedids, is_male: userCookie.is_male, 
            seeking_male: userCookie.seeking_male }, { headers: { Authorization: token } })
            .then(res => {

                // create logic to not show users under this user's matches, user userCookie
                console.log(res.data.users);
                const users = res.data.users
                this.setState({ users });
            });
    }
    render() {

        return (
            <div>
                <div className="wrap">
                    <div id="tinderslide" className={this.state.loggedInUsersId}>
                        <ul>
                            {this.state.users.map(function (user) {
                                console.log('user::: ', user);
                                return (<Pane key={user._id} uid={user._id} age={user.age} link={user.looks[0].link} name={user.firstName} />)
                            })}
                        </ul>
                    </div>
                </div>
                <div className="actions">
                    <a href="#" onClick={this.handleDislikeClick} className="dislike"><i></i></a>
                    <a href="#" onClick={this.handleLikeClick} className="like"><i></i></a>
                </div>
            </div>
        );
    }
};

const Pane = React.createClass({
    render: function () {
        return (
            <div className="to-like" id={this.props.uid}>
                <li className="pane1">
                    <div className="img">
                        <video id="recorded-video" onClick={this.handleVideoClick} className="video" reload="true" src={this.props.link} />
                    </div>
                    <div className="first-name">
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