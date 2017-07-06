

// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ChatSchema = new Schema(
    [{
        chat: {
            id: String,
            messages: [MessageSchema]
        }
    }]

)

module.exports = {
    model: mongoose.model('Chats', ChatSchema),
    schema: ChatSchema
}