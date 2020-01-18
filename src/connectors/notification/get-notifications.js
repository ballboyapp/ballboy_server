const isNumber = require('lodash/isNumber');
const { Notification } = require('../../models');

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const MAX_RESULTS = 20;

//------------------------------------------------------------------------------
// HANDLER:
//------------------------------------------------------------------------------
const getNotifications = async ({ usr }, { limit, offset }) => {
  // Make sure user is logged in
  if (!usr || !usr._id) {
    return [];
  }

  if (!isNumber(limit) || !isNumber(offset)) {
    return [];
  }

  const query = { recipientId: usr._id };

  return Notification.find(query).skip(offset).limit(Math.min(limit, MAX_RESULTS)).sort({ createdAt: 1 });
};

module.exports = getNotifications;
