// Importing Node packages required for schema
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const ROLE_MEMBER = require('../constants').ROLE_MEMBER;
const Schema = mongoose.Schema;
const Matches = require('./matches');
//= ===============================
// Looks Schema
//= ===============================
var LookSchema = new Schema({
    link: String
});


//= ===============================
// User Schema
//= ===============================
const UserSchema = new Schema({
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
    interests: {
        cycling: {type: Boolean, default: false},
        politics: {type: Boolean, default: false},
        motorcycles: {type: Boolean, default: false},
        cars: {type: Boolean, default: false},
        sleeping: {type: Boolean, default: false},
        working: {type: Boolean, default: false},
        photography: {type: Boolean, default: false},
        learning: {type: Boolean, default: false},
        traveling: {type: Boolean, default: false},
        hot_showers: {type: Boolean, default: false},
        innovating: {type: Boolean, default: false},
        law: {type: Boolean, default: false},
        art: {type: Boolean, default: false},
        news: {type: Boolean, default: false},
        math: {type: Boolean, default: false},
        planning: {type: Boolean, default: false},
        school: {type: Boolean, default: false},
        books: {type: Boolean, default: false}
    },
    profile_look: String,
    looks: [
        LookSchema
    ],
    liked_by_ids: Array,
    liked_ids: Array,
    disliked_ids: Array,
    matches: Array,
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    role: {
        type: String,
        default: ROLE_MEMBER
    },
    logged_in: {
        type: Boolean,
        default: false,
        required: true
    }
},

    {
        timestamps: true
    });


//= ===============================
// User ORM Methods
//= ===============================

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function (next) {
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
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) { return cb(err); }

        cb(null, isMatch);
    });
};

// module.exports = mongoose.model('Looks', LookSchema);
// module.exports = mongoose.model('Questions', QuestionSchema);
// module.exports = mongoose.model('Reactions', ReactionSchema);
var User = mongoose.model('User', UserSchema);
var Looks = mongoose.model('Looks', LookSchema);
module.exports = User;

