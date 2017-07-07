// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MessageSchema = new Schema(
    {
        senderId: String,
        receiverId: String,
        message: String,
        timestamp: {
            type: Date,
            default: Date.now()
        },

    }

)

module.exports = {
    model: mongoose.model('Messages', MessageSchema),
    schema: MessageSchema
}