// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./user.js')



var MatchSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        user: UserSchema
    }
})




var Matches = mongoose.model('Matches', MatchSchema);
module.exports = Matches;
