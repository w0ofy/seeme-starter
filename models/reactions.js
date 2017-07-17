// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//= ===============================
// Reactions Schema
//= ===============================
var ReactionSchema = new Schema({
    reaction: String
});

var Reactions = mongoose.model('Reactions', ReactionSchema);
module.exports = Reactions;