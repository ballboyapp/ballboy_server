const Base = require('./base');
const User = require('./user');
const Spot = require('./spot');
const Activity = require('./activity');
const Subscription = require('./subscription');

// Add all your schemas here!
const allSchemas = {
  Base,
  User,
  Spot,
  Activity,
  Subscription,
};

module.exports = allSchemas;
