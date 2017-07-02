// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
<<<<<<< HEAD
=======
const UserSchema = require('./user.js')
>>>>>>> ff7aa1b9521ac64041f66fc08fa59e21abad6858



var MatchSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
<<<<<<< HEAD
        ref: "User"
=======
        ref: "User",
>>>>>>> ff7aa1b9521ac64041f66fc08fa59e21abad6858
    }
})



module.exports = {
    model: mongoose.model('Matches', MatchSchema),
    schema: MatchSchema
}