// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./user.js')



var MatchSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
})



module.exports = {
    model: mongoose.model('Matches', MatchSchema),
    schema: MatchSchema
}