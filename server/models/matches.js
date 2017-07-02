// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



var MatchSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})




var Matches = mongoose.model('Matches', MatchSchema);
module.exports = Matches;
