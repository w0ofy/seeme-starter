// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//= ===============================
// Looks Schema
//= ===============================
var LookSchema = new Schema({
    _id: String,
    look: String
});

module.exports = mongoose.model('Looks', LookSchema);