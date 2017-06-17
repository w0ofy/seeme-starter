// Importing Node packages required for schema
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const ROLE_MEMBER = require('../constants').ROLE_MEMBER;

const Schema = mongoose.Schema;

var LooksSchema = Schema({
    look: {
        title: String,
        link: String
    }
});

var QuestionsSchema = Schema({
    question: String
});

var ReactionsSchema = Schema({
    reaction: String
});

//= ===============================
// User Schema
//= ===============================
const UsersSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastInitial: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: 18,
        required: true
    },
    age_pref_min: {
        type: Number,
        default: 18,
        required: true
    },
    age_pref_max: {
        type: Number,
        default: 50,
        required: true
    },
    location: {
        type: String
    },
    is_male: {
        type: Boolean,
        default: true,
        required: true
    },
    seeking_male: {
        type: Boolean,
        default: false,
        required: true
    },
    profile_look: String,
    looks: [{
        type: Schema.Types.ObjectId,
        ref: "Looks"
    }],
    liked_By_ids: Array,
    liked_ids: Array,
    matches: [{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }],
    questions_Asked: [{
        type: Schema.Types.ObjectId,
        ref: "Questions"
    }],
    questions_Asking: [{
        type: Schema.Types.ObjectId,
        ref: "Questions"
    }],
    reactions: [{
        type: Schema.Types.ObjectId,
        ref: "Reactions"
    }],
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    role: {
        type: String,
        default: ROLE_MEMBER
    }
},

    {
        timestamps: true
    });

//= ===============================
// User ORM Methods
//= ===============================

// Pre-save of user to database, hash password if password is modified or new
UsersSchema.pre('save', function (next) {
    const user = this,
        SALT_FACTOR = 5;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

// Method to compare password for login
UsersSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) { return cb(err); }

        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Looks', LooksSchema);
module.exports = mongoose.model('Questions', QuestionsSchema);
module.exports = mongoose.model('Reactions', ReactionsSchema);
module.exports = mongoose.model('User', UsersSchema);
