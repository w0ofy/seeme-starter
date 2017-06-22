const ROLE_MEMBER = require('./constants').ROLE_MEMBER;
// const ROLE_CLIENT = require('./constants').ROLE_CLIENT;
// const ROLE_OWNER = require('./constants').ROLE_OWNER;
// const ROLE_ADMIN = require('./constants').ROLE_ADMIN;

// Set user info from request
exports.setUserInfo = function setUserInfo(request) {
  // console.log("request", request);
  const getUserInfo = {
    _id: request._id,
    firstName: request.firstName,
    lastInitial: request.lastInitial,
    email: request.email,
    age: request.age,
    is_male: request.is_male,
    age_pref_min: request.age_pref_min,
    age_pref_max: request.age_pref_max,
    location: request.location,
    profile_look: request.profile_look,
    looks: request.looks,
    matches: request.matches,
    questions_asked: request.questions_asked,
    questions_asking: request.questions_asking,
    reactions: request.reactions,
    role: request.role
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
// removed from switch case for exports.getRole
// case ROLE_ADMIN: role = 4; break;
// case ROLE_OWNER: role = 3; break;
// case ROLE_CLIENT: role = 2; break;