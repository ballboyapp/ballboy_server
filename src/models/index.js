const {
  User,
  validateSignup,
  validateLogin,
  validateCredentials,
  validateFBAuth,
  // validateUserProfile,
  validateUserUpdate,
} = require('./user');

const {
  City,
} = require('./city');

const {
  Spot,
} = require('./spot');

const {
  Activity,
} = require('./activity');

module.exports = {
  User,
  City,
  Spot,
  Activity,
  validateSignup,
  validateLogin,
  validateCredentials,
  validateFBAuth,
  // validateUserProfile,
  validateUserUpdate,
};
