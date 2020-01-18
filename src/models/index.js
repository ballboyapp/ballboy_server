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

const {
  Notification,
} = require('./notification');

module.exports = {
  User,
  City,
  Spot,
  Activity,
  Notification,
  validateSignup,
  validateLogin,
  validateCredentials,
  validateFBAuth,
  // validateUserProfile,
  validateUserUpdate,
};
