const { NotificationsList } = require('../../models');

//------------------------------------------------------------------------------
// HANDLER:
//------------------------------------------------------------------------------
const getNotificationsList = async ({ usr }) => {
  // Make sure user is logged in
  if (!usr || !usr._id) {
    return [];
  }

  const query = { 'recipient.id': usr._id };

  return NotificationsList.findOne(query);
};

module.exports = getNotificationsList;
