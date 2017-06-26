import React, { Component } from 'react';
import Modal from 'react-modal';
import MdDelete from 'react-icons/lib/md/delete';
const cookie = require('react-cookie')
const axios = require('axios');

class TrashLookFour extends React.Component {
    trashLook() {
        const user = cookie.load('user');
        const emailQuery = user.email;
        const lookId = user.looks[3]._id;
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

export default TrashLookFour;