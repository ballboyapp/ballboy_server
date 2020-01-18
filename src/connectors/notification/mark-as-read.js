const { Notification } = require('../../models');

const markAsRead = async ({ usr }) => {
  // Make sure user is logged in
  if (!usr || !usr._id) {
    return null;
  }

  await Notification.update({ recipientId: usr._id, didRead: false }, { $set: { didRead: true } });

  return [];
};

module.exports = markAsRead;
