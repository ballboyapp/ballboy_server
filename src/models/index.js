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
  NotificationsList,
} = require('./notifications-list');

module.exports = {
  User,
  City,
  Spot,
  Activity,
  NotificationsList,
  validateSignup,
  validateLogin,
  validateCredentials,
  validateFBAuth,
  // validateUserProfile,
  validateUserUpdate,
};
