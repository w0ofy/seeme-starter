const User = require('../models/user');
const Looks = require('../models/looks');
const Reactions = require('../models/reactions');
const Questions = require('../models/questions');
const setUserInfo = require('../helpers').setUserInfo;
const jwt = require('jsonwebtoken');
const config = require('../config/main');
function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 604800 // in seconds
  });
}

//= =======================================
// User Routes
//= =======================================
exports.viewProfile = function (req, res, next) {
  const userId = req.params.userId;
  console.log(req.user._id);
  // console.log(req.user._id + " " + userId);
  // console.log("here", req.user._id);
  // console.log("here", userId);
  if (req.user._id.toString() !== userId) {
    return res.status(401).json({ error: 'You are not authorized to view this user profile.' });
  } else {


    User.findById(userId, (err, user) => {
      if (err) {
        res.status(400).json({ error: 'No user could be found for this ID.' });
        return next(err);
      }

      const userToReturn = setUserInfo(user);

      return res.status(200).json({ user: userToReturn });
    });
  }
};


//= =======================================
// Update Profile Route
//= =======================================
exports.updateProfile = function (req, res, next) {
  // Check for registration errors
  const emailQuery = req.body.emailQuery,
    firstName = req.body.firstName,
    lastInitial = req.body.lastInitial
  age = req.body.age,
    is_male = req.body.is_male,
    seeking_male = req.body.seeking_male,
    age_pref_min = req.body.age_pref_min,
    age_pref_max = req.body.age_pref_max;
  // console.log("body", req.body);

  var query = { email: emailQuery };

  User.findOneAndUpdate(query, {
    firstName: firstName,
    is_male: is_male,
    seeking_male: seeking_male,
    age: age,
    age_pref_min: age_pref_min,
    age_pref_max: age_pref_max
  }, (err, user) => {
    if (err) {
      console.log("Something wrong when updating data!");
    }
    User.findOne({ email: emailQuery }, (err, updatedUser) => {
      const userInfo = setUserInfo(updatedUser);
      console.log("userInfo", userInfo);
      res.status(201).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
      });
    });

  });
};

//= =======================================
// Update Profile Route
//= =======================================
exports.addLook = function (req, res, next) {
  // Check for registration errors
  const emailQuery = req.body.emailQuery,
    userIdForNewLook = req.body._id,
    newLook = { _id: userIdForNewLook,link: req.body.lookLink };
  // console.log("body", req.body);

  const query = { email: emailQuery };
  console.log("req.body", req.body);
  User.findOneAndUpdate(query, { $push: { "looks": newLook } },
    (err, user) => {
      if (err) {
        console.log("newlook: ", newLook);
        throw err;

      }
      console.log("loooooooooooooooooook", user.looks);

      User.findOne(query, (err, updatedUser) => {
        const userInfo = setUserInfo(updatedUser);
        // console.log("userInfo", userInfo);
        res.status(201).json({
          token: `JWT ${generateToken(userInfo)}`,
          user: userInfo

        });

      });

    });
};