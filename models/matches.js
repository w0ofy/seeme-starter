// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MatchSchema = new Schema(
    [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]

)

module.exports = {
    model: mongoose.model('Matches', MatchSchema),
    schema: MatchSchema
}