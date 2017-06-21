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
  const email = req.body.email,
    firstName = req.body.firstName,
    lastInitial = req.body.lastInitial
  age = req.body.age,
    is_male = req.body.is_male,
    seeking_male = req.body.seeking_male,
    age_pref_min = req.body.age_pref_min,
    age_pref_max = req.body.age_pref_max;

  var query = { email: email };
  User.update(query, {
    firstName: firstName,
    email: email,
    age: age,
    age_pref_min: age_pref_min,
    age_pref_max: age_pref_max
  }, function (err, user) {
    if (err) {
      console.log("Something wrong when updating data!");
    }

    const userInfo = setUserInfo(user);

    res.status(201).json({
      token: `JWT ${generateToken(userInfo)}`,
      user: userInfo
    });
  });
};
