import React from 'react';

class Playback extends React.Component {
    playVideo() {
        this.refs.newLook.play();
    }
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="v-container">
                <video className="video" ref="newLook" src={this.props.src} />
                <button className="v-ctl replay" onClick={this.playVideo.bind(this)}>replay</button>
            </div>
        )
    }
}

export default Playback;