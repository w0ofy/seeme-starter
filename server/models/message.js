// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MessageSchema = new Schema({
        text: String,
        timestamp: {
            type: Date,
            default: Date.now()
        },
        sender: String
    }

)

module.exports = {
    model: mongoose.model('Message', MessageSchema),
    schema: MessageSchema
}