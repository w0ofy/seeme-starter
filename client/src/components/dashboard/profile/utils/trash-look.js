import React, { Component } from 'react';
import Modal from 'react-modal';
import mui from 'material-ui';
import MdIconPack from 'react-icons/lib/md';
import MdDelete from 'react-icons/lib/md/delete';
const cookie = require('react-cookie')
const axios = require('axios');

class TrashLook extends React.Component {
    // constructor() {
    //     super();

    //     this.state = {
    //         modalIsOpen: false
    //     };

    //     this.openModal = this.openModal.bind(this);
    //     this.afterOpenModal = this.afterOpenModal.bind(this);
    //     this.closeModal = this.closeModal.bind(this);
    // }
    trashLook() {
        const user = cookie.load('user');
        const emailQuery = user.email;
        const lookId = user.looks[0]._id;
        console.log(lookId)
        axios.put('http://localhost:3000/api/user/delete-look', {
            emailQuery: emailQuery,
            lookId: lookId
        },
            { headers: { Authorization: cookie.load('token') } })
            .then((response) => {
                cookie.save('token', response.data.token, { path: '/' });
                cookie.save('user', response.data.user, { path: '/' });
                window.location.reload()
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <button className="trash-look" onClick={this.trashLook}><MdDelete /></button>
            </div>
        );
    }
}

export default TrashLook;

// <div>
//     <button className="add-look" onClick={this.openModal}>+</button>
//     <Modal
//         isOpen={this.state.modalIsOpen}
//         onAfterOpen={this.afterOpenModal}
//         onRequestClose={this.closeModal}
//         style={customStyles}
//         contentLabel="Example Modal"
//     >

//         <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>

//         <button onClick={this.closeModal}>close</button>

//     </Modal>
// </div>