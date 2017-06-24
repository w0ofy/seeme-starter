import React from 'react';
import { captureUserMedia, S3Upload } from './utils/rtc-utils';
import Webcam from './utils/webcam';
import RecordRTC from 'recordrtc';
const cookie = require('react-cookie');
// import { Modal } from 'react-bootstrap';

const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia || navigator.msGetUserMedia);

class PhotoBooth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recordVideo: null,
      src: null,
      uploadSuccess: null,
      uploading: false
    };

    this.requestUserMedia = this.requestUserMedia.bind(this);
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
  }

  componentDidMount() {
    if(!hasGetUserMedia) {
      alert("Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.");
      return;
    }
    this.requestUserMedia();
  }

  requestUserMedia() {
    console.log('requestUserMedia')
    captureUserMedia((stream) => {
      this.setState({ src: window.URL.createObjectURL(stream) });
      console.log('setting state', this.state)
    });
  }

  startRecord() {
    captureUserMedia((stream) => {
      this.state.recordVideo = RecordRTC(stream, { type: 'video' });
      this.state.recordVideo.startRecording();
    });

    setTimeout(() => {
      this.stopRecord();
    }, 10000);
  }

  stopRecord() {
    this.state.recordVideo.stopRecording(() => {
        let user = cookie.load('user');
      let params = {
        type: 'video/webm',
        data: this.state.recordVideo.blob,
        id: user._id + Math.floor(Math.random()*90000) + 10000
      }

      this.setState({ uploading: true });

      S3Upload(params)
      .then((success) => {
        console.log('enter then statement')
        if(success) {
          console.log(success)
          this.setState({ uploadSuccess: true, uploading: false });
        }
      }, (error) => {
        alert(error, 'error occurred. check your aws settings and try again.')
      })
    });
  }

  render() {
    return(
      <div>
        
        <div><Webcam src={this.state.src}/></div>
        {this.state.uploading ?
          <div>Uploading...</div> : null}
        <div><button onClick={this.startRecord}>Start Record</button></div>
        <div><button onClick={this.stopRecord}>Stop Record</button></div>
      </div>
    )
  }
}

export default PhotoBooth;
