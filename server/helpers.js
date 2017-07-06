const ROLE_MEMBER = require('./constants').ROLE_MEMBER;

// Set user info from request
exports.setUserInfo = function setUserInfo(request) {
  // console.log("request", request);
  const getUserInfo = {
    _id: request._id,
    firstName: request.firstName,
    email: request.email,
    age: request.age,
    is_male: request.is_male,
    seeking_male: request.seeking_male,
    age_pref_min: request.age_pref_min,
    age_pref_max: request.age_pref_max,
    location: request.location,
    profile_look: request.profile_look,
    looks: request.looks,
    matches: request.matches,
    role: request.role,
    disliked_ids: request.disliked_ids,
    liked_ids: request.liked_ids,
    liked_by_ids: request.liked_by_ids,
    logged_in: request.logged_in,
    interests: request.interests
  };
  
  return getUserInfo;
};

exports.getRole = function getRole(checkRole) {
  let role;

  switch (checkRole) {
    case ROLE_MEMBER: role = 1; break;
    default: role = 1;
  }

  return role;
};