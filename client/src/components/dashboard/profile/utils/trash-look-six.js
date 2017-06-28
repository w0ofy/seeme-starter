import React, { Component } from 'react';
import Modal from 'react-modal';
import MdDelete from 'react-icons/lib/md/delete';
const cookie = require('react-cookie')
const axios = require('axios');

class TrashLookSix extends React.Component {
    constructor(props) {
        super(props);
        this.trashLook = this.trashLook.bind(this);
    }
    trashLook() {
        const user = cookie.load('user');
        const emailQuery = user.email;
        const lookId = user.looks[5]._id;
        console.log(lookId)
        axios.put('http://localhost:3000/api/user/delete-look', {
            emailQuery: emailQuery,
            lookId: lookId
        },
            { headers: { Authorization: cookie.load('token') } })
            .then((response) => {
                cookie.save('token', response.data.token, { path: '/' });
                cookie.save('user', response.data.user, { path: '/' });
                this.props.remove();
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

export default TrashLookSix;