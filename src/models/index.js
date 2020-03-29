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

const {
  ChatRooms,
} = require('./chat-rooms');

module.exports = {
  User,
  City,
  Spot,
  Activity,
  NotificationsList,
  ChatRooms,
  validateSignup,
  validateLogin,
  validateCredentials,
  validateFBAuth,
  // validateUserProfile,
  validateUserUpdate,
};
