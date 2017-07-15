import React from 'react';
import { Link } from 'react-router';
const cookie = require('react-cookie')
const axios = require('axios');



class Swipe extends React.Component {
    constructor(props) {
        super(props);
        let userCookie = cookie.load('user');
        this.state = {
            thisuser: userCookie,
            users: [],
            loggedInUsersId: userCookie._id,
            swipedRight: false,
            swipedLeft: false
        };
        this.handleLikeClick = this.handleLikeClick.bind(this);
        this.handleDislikeClick = this.handleDislikeClick.bind(this);
    }
    handleLikeClick(e) {
        e.preventDefault();
        const userCookie = cookie.load('user');
        const token = cookie.load('token');
        const url = 'http://seemeapp.herokuapp.com/api/liking'
        let beingSwiped = document.getElementById('#tinderslide ul div:last-child');

        //Retrieve logged in user's current number of matches
        let numOfMatches = userCookie.matches.length;
        console.log(numOfMatches);

        this.setState({ swipedRight: true })
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
                //if the new user object has more matches than before...
                if (res.data.user.matches.length > numOfMatches) {
                    //notify the user of their match.
                    // console.log(res.data.user.matches.pop())
                }
            });
        let that = this;
        setTimeout(function () {
            beingSwiped.remove();
            that.setState({ swipedRight: false })
        }, 350);
    }
    handleDislikeClick(e) {
        e.preventDefault();
        const userCookie = cookie.load('user');
        const token = cookie.load('token');
        const url = 'http://seemeapp.herokuapp.com/api/disliking'
        let beingSwiped = document.getElementById('#tinderslide ul div:last-child');

        this.setState({ swipedLeft: true })
        let disliked = this.state.users.pop()

        axios.put(url, {
            uid: userCookie._id,
            dislikedId: disliked._id
        }, { headers: { Authorization: token } })
            .then(res => {
                cookie.save('token', res.data.token, { path: '/' });
                cookie.save('user', res.data.user, { path: '/' });
            });
        let that = this;
        setTimeout(function () {
            beingSwiped.remove();
            that.setState({ swipedLeft: false })
            console.log(beingSwiped.parent());
        }, 350);

    }
    handleVideoClick(e) {
        e.preventDefault();
        this.click(function () { this.paused ? this.play() : this.pause(); });
    }
    componentWillMount() {
        const userCookie = cookie.load('user'),
            token = cookie.load('token'),
            url = 'http://seemeapp.herokuapp.com/api/all-users',
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

        axios.put(url, { id: userCookie._id, liked: likedids, disliked: dislikedids, age_pref_min: userCookie.age_pref_min, age_pref_max: userCookie.age_pref_max, seeking_male: userCookie.seeking_male }, { headers: { Authorization: token } })
            .then(res => {

                const users = res.data.users
                this.setState({ users });
            });
        console.log("users", this.state.users);
    }
    render() {
        let that = this;
        return (
            <div>
                <div className="wrap">
                    <div id="tinderslide" className={this.state.loggedInUsersId}>
                        <ul>

                            {this.state.users.length === 0
                                ? <span className={that.state.users.length === 0 ? "n-more" : "y-more"}>There is no one nearby within your match preferences. Try back later or try changing your <Link to="/edit-info" className="match-pref">match preferences</Link>.</span>
                                : this.state.users.map(function (user, i) {

                                    let profilelook = null;
                                    if (user.looks[0] === undefined) {
                                        profilelook = "none";
                                    } else {
                                        profilelook = user.looks[0].link;
                                    }
                                    return (<Pane key={i} classSwipedRight={that.state.swipedRight} classSwipedLeft={that.state.swipedLeft} uid={user._id} age={user.age} link={profilelook} name={user.firstName} />)

                                })
                            }
                        </ul>
                    </div>
                </div>
                {this.state.users.length == 0 ? null :
                    <div className="actions">
                        <a href="#" onClick={this.handleDislikeClick} className="dislike"><i></i></a>
                        <a href="#" onClick={this.handleLikeClick} className="like"><i></i></a>
                    </div>
                }
            </div>
        );
    }
};

const Pane = React.createClass({
    render: function () {
        return (
            <div className={" to-like " + (this.props.classSwipedRight ? " swipe-right " : " ") + (this.props.classSwipedLeft
                ? " swipe-left " : " ")} id={this.props.uid}>
                <li className="pane1">
                    <div className="img">
                        <video id="recorded-video" ref={this.props.uid} onClick={() => {
                            let video = this.props.uid;
                            this.refs[video].paused ? this.refs[video].play() : this.refs[video].pause()
                        }}
                            className="video"
                            src={this.props.link} />
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

export default Swipe;