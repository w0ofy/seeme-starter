const User = require('../models/user');
const Matches = require('../models/matches');
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
    age_pref_max = req.body.age_pref_max,
    logged_in = req.body.logged_in;

  var query = { email: emailQuery };

  User.findOneAndUpdate(query, {
    firstName: firstName,
    is_male: is_male,
    seeking_male: seeking_male,
    age: age,
    age_pref_min: age_pref_min,
    age_pref_max: age_pref_max,
    logged_in: logged_in
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
  const
    donotshow = req.body.liked,
    id = req.body.id,
    disliked = req.body.disliked,
    seeking_male = req.body.seeking_male,
    age_pref_min = req.body.age_pref_min,
    age_pref_max = req.body.age_pref_max;
  let is_male = false;
  console.log(seeking_male);
  if (disliked) {
    for (var i = 0; i < disliked.length; i++) {
      donotshow.push(disliked[i]);
    }
  }
  if (seeking_male === false) {
    is_male = true
  }
  donotshow.push(id);

  console.log(donotshow);

  User.find({ _id: { $nin: donotshow }, is_male: { $ne: is_male }, age: { $lte: age_pref_max }, age: { $gte: age_pref_min } }, function (err, users) {
    if (!err) {
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

  User.findOne({ _id: { $eq: likedId } }, function (err, user) {
    if (err) {
      throw err;
    }
  }).exec(function (err, user) {

    for (let i = 0; i < user.liked_ids.length; i++) {
      if (liked_by_id === user.liked_ids[i].id) {
        // Update matches for logged in user

        let newMatch = new Matches(user);
        newMatch.save(function (error, doc) {
          // Log any errors
          if (error) {
            console.log(error);
          }
          // Otherwise
          else {
            // Use the article id to find and update it's note $push: { "liked_ids": { id: likedId } }
            User.findOneAndUpdate({ "_id": liked_by_id }, { $push: { matches: doc._id } })
              // Execute the above query
              .exec(function (err, doc) {
                // Log any errors
                if (err) {
                  console.log(err);
                }
                else {
                  // Or send the document to the browser
                  console.log("successfully added match");
                }
              });
          }
        });

        //update matches for corresponding user


      }
    }
  });


  User.update({ _id: likedId }, { $push: { "liked_by_ids": { id: liked_by_id } } },
    (err, user) => {
      if (err) {
        throw err;
      } else {
        console.log('success');
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


exports.dislikingUser = function (req, res, next) {
  const
    thisuser = req.body.uid,
    dislikedId = req.body.dislikedId,

    query = { _id: thisuser };

  User.update(query, { $push: { "disliked_ids": { id: dislikedId } } },
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