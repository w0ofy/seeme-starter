// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//= ===============================
// Reactions Schema
//= ===============================
var ReactionSchema = new Schema({
    reaction: String
});

module.exports = mongoose.model('Reactions', ReactionSchema);