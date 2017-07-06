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
  const uid = req.params.uid;
  console.log(uid);

    User.findById(uid, (err, user) => {
      if (err) {
        res.status(400).json({
          error: 'No user could be found for this ID.'
        });
        return next(err);
      }

      const userToReturn = setUserInfo(user);

      return res.status(200).json({
        user: userToReturn
      });
    });

};



//= =======================================
// Update Profile Route
//= =======================================
exports.updateProfile = function (req, res, next) {
  console.log(req.body)
  const emailQuery = req.body.emailQuery,
    firstName = req.body.firstName,
    age = req.body.age,
    is_male = req.body.is_male,
    seeking_male = req.body.seeking_male,
    age_pref_min = req.body.age_pref_min,
    age_pref_max = req.body.age_pref_max,
    sleeping = req.body.sleeping,
    cycling = req.body.cycling,
    news = req.body.news,
    traveling = req.body.traveling,
    cars = req.body.cars,
    learning = req.body.learning,
    law = req.body.law,
    art = req.body.art
    photography = req.body.photography,
    logged_in = req.body.logged_in;

  let query = {
    email: emailQuery
  };

  User.findOneAndUpdate(query, {
    firstName: firstName,
    is_male: is_male,
    seeking_male: seeking_male,
    age: age,
    age_pref_min: age_pref_min,
    age_pref_max: age_pref_max,
    interests: {cycling: cycling, sleeping: sleeping, news: news, photography: photography, traveling: traveling, cars: cars, learning: learning, law: law, art: art},
    logged_in: logged_in

  }, (err, user) => {
    if (err) {
      console.log("Something went wrong when updating the database!");
      throw err
    }
    User.findOne({
      email: emailQuery
    }, (err, updatedUser) => {
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
// Add Look Route
//= =======================================
exports.addLook = function (req, res, next) {

  const emailQuery = req.body.emailQuery,
    newLook = {
      link: req.body.lookLink
    };
  // console.log("body", req.body);

  const query = {
    email: emailQuery
  };
  console.log("req.body", req.body);
  User.findOneAndUpdate(query, {
    $push: {
      "looks": newLook
    }
  },
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


exports.deleteLook = function (req, res, next) {

  const emailQuery = req.body.emailQuery,
    deleteThisLook = req.body.lookId,
    query = {
      email: emailQuery
    };

  User.findOneAndUpdate(query, {
    $pull: {
      "looks": {
        _id: deleteThisLook
      }
    }
  },
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
    donotshow = req.body.liked, // initially, users who are already liked by the logged-in user
    id = req.body.id, // logged-in user id
    disliked = req.body.disliked, // initially, users who are already disliked by the logged-in user
    seeking_male = req.body.seeking_male, // seeking male pref
    age_pref_min = req.body.age_pref_min, // age min pref
    age_pref_max = req.body.age_pref_max; // age max pref
  let is_male = false;

  console.log(seeking_male);
  if (disliked) {
    for (var i = 0; i < disliked.length; i++) {
      // push all dislikes into likes array to officially start building a donotshow array
      donotshow.push(disliked[i]);
    }
  }
  // if user isn't trying to meet a male, set to find guys because query is set to find $ne (not equal)
  if (seeking_male === false) {
    is_male = true
  }
  // push currently logged in user to the donotshow array
  donotshow.push(id);

  // console.log(donotshow);
  // find all users excluding the users in donotshow array
  User.find({
    _id: {
      $nin: donotshow
    },
    is_male: {
      $ne: is_male
    },
    age: {
      $lte: age_pref_max
    },
    age: {
      $gte: age_pref_min
    }
  }, function (err, users) {
    if (!err) {
      return res.status(201).json({
        users: users
      });
    } else {
      res.status(400).json({
        error: 'No user could be found for this ID.'
      });
      throw err;
    }
  });
};

exports.likingUser = function (req, res, next) {
  const
    emailQuery = req.body.emailQuery,
    liked_by_id = req.body.uid,
    likedId = req.body.likedId,

    query = {
      email: emailQuery
    };
  console.log(likedId);
  // find the user who the logged-in user liked
  User.findOne({
    _id: {
      $eq: likedId
    }
  }, function (err, user) {
    if (err) {
      throw err;
    }
  }).exec(function (err, user) {

    for (let i = 0; i < user.liked_ids.length; i++) {
      // if the above user likes the logged in user too...
      if (liked_by_id === user.liked_ids[i].id) {
        console.log(user)
        // Save the user who got liked
        let newMatch = new Matches.model(user);

        newMatch.save(function (error, match) {
          // Log any errors
          if (error) {
            console.log(error);
          }
          // Otherwise
          else {
            // add the liked-user to the logged-in user's matches
            User.findOneAndUpdate({
              "_id": liked_by_id
            }, {
                $push: {
                  matches: match._id
                }
              })
              // Execute the above query
              .exec(function (err, match) {
                // Log any errors
                if (err) {
                  console.log(err);
                } else {

                  console.log("user", match);
                  let matchedWith = new Matches.model(match);
                  matchedWith.save(function (error, match2) {

                    if (error) {
                      console.log(error);
                    } else {

                      // Add a match to the logged in user as well
                      User.findOneAndUpdate({
                        "_id": likedId
                      }, {
                          $push: {
                            matches: match2._id
                          }
                        })
                        .exec(function (error, match2) {
                          if (error) {
                            console.log(error);
                          } else {
                            console.log("fasdfada");
                          }
                        })
                    }
                  })
                }
              })
          }
        });
      }
    }

  });

  // always update logged in user's likes
  User.update({
    _id: likedId
  }, {
      $push: {
        "liked_by_ids": {
          id: liked_by_id
        }
      }
    },
    (err, user) => {
      if (err) {
        throw err;
      } else {
        console.log('success');
      }
    });
  // always update a liked-user's likes
  User.findOneAndUpdate(query, {
    $push: {
      "liked_ids": {
        id: likedId
      }
    }
  },
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

    query = {
      _id: thisuser
    };
  // update the logged-in user's dislikes
  User.update(query, {
    $push: {
      "disliked_ids": {
        id: dislikedId
      }
    }
  },
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

//= =======================================
// Populate Matches Route
//= =======================================

exports.populateMatches = function (req, res, next) {
  query = {
    _id: req.body.id
  }
  User.findOne(query).populate({ 
    path: 'matches', 
    populate: { path: 'matches'}
  }).exec((err, user) => {
    if (err) {
      throw err;
    }
    res.json(user.matches);
  })
};

