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
            <div>
                <video className="video" ref="newLook" src={this.props.src} />
                <button onClick={this.playVideo.bind(this)}>replay</button>
            </div>
        )
    }
}

export default Playback;