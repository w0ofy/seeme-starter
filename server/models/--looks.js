// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//= ===============================
// Looks Schema
//= ===============================
var LookSchema = new Schema({
    look: String
});

var Looks = mongoose.model('Looks', LookSchema);
module.exports = Looks;