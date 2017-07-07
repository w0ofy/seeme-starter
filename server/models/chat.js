

// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MessageSchema = require('./message').schema;
var ChatSchema = new Schema(
    [{
        chat: {
            type: Schema.Types.ObjectId,
            ref: 'Messages'
        }
    }]

)

module.exports = {
    model: mongoose.model('Chats', ChatSchema),
    schema: ChatSchema
}