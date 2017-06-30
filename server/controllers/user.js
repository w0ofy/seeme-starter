const User = require('../models/user');
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

  const emailQuery = req.body.emailQuery,
    firstName = req.body.firstName,
    lastInitial = req.body.lastInitial
  age = req.body.age,
    is_male = req.body.is_male,
    seeking_male = req.body.seeking_male,
    age_pref_min = req.body.age_pref_min,
    age_pref_max = req.body.age_pref_max;

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
      // console.log("userInfo", userInfo);
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

  const emailQuery = req.body.emailQuery,
    newLook = { link: req.body.lookLink };
  // console.log("body", req.body);

  const query = { email: emailQuery };
  console.log("req.body", req.body);
  User.findOneAndUpdate(query, { $push: { "looks": newLook } },
    (err, user) => {
      if (err) {
        console.log("newlook: ", newLook);
        throw err;

      }
      // console.log("loooooooooooooooooook", user.looks);

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

//= =======================================
// Update Profile Route
//= =======================================
exports.deleteLook = function (req, res, next) {

  const emailQuery = req.body.emailQuery,
    deleteThisLook = req.body.lookId,
    query = { email: emailQuery };

  User.findOneAndUpdate(query, { $pull: { "looks": { _id: deleteThisLook } } },
    (err, user) => {
      if (err) {
        console.log("newlook: ", newLook);
        throw err;
      }

      User.findOne(query, (err, updatedUser) => {
        const userInfo = setUserInfo(updatedUser);

        res.status(201).json({
          token: `JWT ${generateToken(userInfo)}`,
          user: userInfo

        });
      });
    });
};

exports.findAllUsers = function (req, res, next) {
  const id = req.body.id;
  const liked = req.body.liked
  liked.push(id);

  User.find({ _id: { $nin: liked } }, function (err, users) {
    if (!err) {
      // console.log("bobom", users);
      return res.status(201).json({ users: users });

    } else {
      res.status(400).json({ error: 'No user could be found for this ID.' });
      throw err;
    }
  });
};

exports.likingUser = function (req, res, next) {
  const
    emailQuery = req.body.emailQuery,
    liked_by_id = req.body.uid,
    likedId = req.body.likedId,

    query = { email: emailQuery };
  console.log(likedId);

  User.update({_id: likedId}, { $push: { "liked_By_ids": { id: liked_by_id } } },
    (err, user) => {
      if (err) {
        throw err;
      }

    });

  User.findOneAndUpdate(query, { $push: { "liked_ids": { id: likedId } } },
    (err, user) => {
      if (err) {
        throw err;
      }

      User.findOne(query, (err, updatedUser) => {
        const userInfo = setUserInfo(updatedUser);

        res.status(201).json({
          token: `JWT ${generateToken(userInfo)}`,
          user: userInfo

        });
      });
    });
};