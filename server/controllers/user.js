const User = require('../models/user');
const setUserInfo = require('../helpers').setUserInfo;

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
    email = req.user.email,
    firstName = req.body.firstName,
    lastInitial = req.user.lastInitial
    age = req.user.age,
    is_male = req.user.is_male,
    seeking_male = req.user.seeking_male,
    age_pref_min = req.user.age_pref_min,
    age_pref_max = req.user.age_pref_max;
    console.log("body", req.body);
    console.log("user", req.user);

  var query = { email: emailQuery };
  User.findOneAndUpdate(query, {
    firstName: firstName,
    email: email,
    age: age,
    age_pref_min: age_pref_min,
    age_pref_max: age_pref_max
  }, (err, user) => {
    if (err) {
      console.log("Something wrong when updating data!");
    }
 
    const userInfo = setUserInfo(user);

    res.status(201).json({
      user: userInfo
    });
  });
};
