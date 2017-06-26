import React from 'react';
import mui from 'material-ui';
import MdIconPack from 'react-icons/lib/md';
import MdReplay from 'react-icons/lib/md/replay';

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
                <button className="v-ctl replay" onClick={this.playVideo.bind(this)}><MdReplay /></button>
            </div>
        )
    }
}

export default Playback;