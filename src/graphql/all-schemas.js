const Base = require('./base');
const User = require('./user');
const City = require('./city');
const Spot = require('./spot');
const Activity = require('./activity');
const NotificationsList = require('./notifications-list');
const ChatRooms = require('./chat-rooms');

// Add all your schemas here!
const allSchemas = {
  Base,
  User,
  City,
  Spot,
  Activity,
  NotificationsList,
  ChatRooms,
};

module.exports = allSchemas;
