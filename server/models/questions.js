// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//= ===============================
// Questions Schema
//= ===============================
var QuestionSchema = new Schema({
    question: String
});

var Questions = mongoose.model('Questions', QuestionSchema);
module.exports = Questions;