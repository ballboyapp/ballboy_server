const Base = require('./base');
const User = require('./user');
const City = require('./city');
const Spot = require('./spot');
const Activity = require('./activity');
const Notification = require('./notification');

// Add all your schemas here!
const allSchemas = {
  Base,
  User,
  City,
  Spot,
  Activity,
  Notification,
};

module.exports = allSchemas;
