import React, { Component } from 'react';
import Modal from 'react-modal';
import PhotoBooth from './photo-booth';
import MdAddAPhoto from 'react-icons/lib/md/add-a-photo';
import MdClose from 'react-icons/lib/md/close'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class PhotoBoothModal extends React.Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <div>
                <a className="add-look" title="Add A New Look" onClick={this.openModal}><MdAddAPhoto /></a>
                <h4 className="add-l-label">Add A Look</h4>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <PhotoBooth />
                    
                    <button className="cncl-modal" onClick={this.closeModal}><MdClose /></button>
                </Modal>
            </div>
        );
    }
}

export default PhotoBoothModal;