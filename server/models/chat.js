// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ChatSchema = new Schema({
        id: String,
        messages: {
            message: {
                type: Schema.Types.ObjectId,
                ref: "Message"
            }
        }
    }
)

module.exports = {
    model: mongoose.model('Chat', ChatSchema),
    schema: ChatSchema
}