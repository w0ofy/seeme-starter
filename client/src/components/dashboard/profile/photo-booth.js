const React = require('react');
import { Link } from 'react-router';

const PhotoBooth = React.createClass({

    // constructor(props) {
    //     // super(props);
    // },

    render() {

        var object = {
            roomname: "jsfiddletest",
            /*provide a valid url for signalmaster otherwise this won't work*/
            signalmasterUrl: "example.com"
        }
        return (
            <div>
                <WebRtc obj={object} />
            </div>
        );
    }
})

const WebRtc = React.createClass({

    constructor(props) {
        // super(props);
        this.addVideo = this.addVideo.bind(this);
        this.removeVideo = this.removeVideo.bind(this);
        this.readyToCall = this.readyToCall.bind(this);
    },
    componentDidMount() {
        this.webrtc = new SimpleWebRTC({
            localVideoEl: ReactDOM.findDOMNode(this.refs.local),
            remoteVideosEl: "",
            autoRequestMedia: true,
            url: this.props.obj.signalmasterUrl
        });

        console.log("webrtc component mounted");
        this.webrtc.on('videoAdded', this.addVideo);
        this.webrtc.on('videoRemoved', this.removeVideo);
        this.webrtc.on('readyToCall', this.readyToCall);
    },

    addVideo(video, peer) {
        console.log('video added', peer);
        //  console.log(this.refs.remotes);
        var remotes = ReactDOM.findDOMNode(this.refs.remotes);
        console.log(remotes);
        if (remotes) {
            var container = document.createElement('div');
            container.className = 'videoContainer';
            container.id = 'container_' + this.webrtc.getDomId(peer);
            container.appendChild(video);
            // suppress contextmenu
            video.oncontextmenu = function () {
                return false;
            };
            console.log(container);
            remotes.appendChild(container);
        }
    },

    removeVideo(video, peer) {
        console.log('video removed ', peer);
        var remotes = ReactDOM.findDOMNode(this.refs.remotes);
        var el = document.getElementById(peer ? 'container_' + this.webrtc.getDomId(peer) : 'localScreenContainer');
        if (remotes && el) {
            remotes.removeChild(el);
        }
    },

    readyToCall() {
        return this.webrtc.joinRoom(this.props.obj.roomname);
    },

    connect() {
        console.log("connected");
    },

    disconnect() {
        console.log("disconnected");
    },

    render() {
        return (
            <div>
                <video className="local"
                    id="localVideo"
                    ref="local" >
                </video>
                <div className="remotes"
                    id="remoteVideos"
                    ref="remotes" />
            </div>
        );
    }
})

module.exports =
    PhotoBooth,
    WebRtc;