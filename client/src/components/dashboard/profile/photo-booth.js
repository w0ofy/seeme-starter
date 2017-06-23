const React = require('react');
import { Link } from 'react-router';
import { captureUserMedia, S3Upload } from './utils/rtc-utils';  

const PhotoBooth = React.createClass({
    startRecord() {
        captureUserMedia((stream) => {
            this.state.recordVideo = RecordRTC(stream, { type: 'video' });
            this.state.recordVideo.startRecording();
        })
    },
    requestUserMedia() {
        captureUserMedia((stream) => {
            this.setState({ src: window.URL.createObjectURL(stream) });
        });
    },
    componentDidMount() {
        if (!hasGetUserMedia()) {
            alert("Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.");
            return;
        }
        this.requestUserMedia();
    },
    captureUserMedia(callback) {
        var params = { audio: false, video: true };
        navigator.getUserMedia(params, callback, (error) => {
            alert(JSON.stringify(error));
        });
    },
    render() {
        return (
            <video src={this.props.src} />
        )
    }
})