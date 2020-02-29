const { NotificationsList } = require('../../models');

const markAsRead = async ({ usr }) => {
  // Make sure user is logged in
  if (!usr || !usr._id) {
    return null;
  }

  const query = { 'recipient.id': usr._id };
  const modifier = { $set: { 'items.$[].didRead': true } };

  await NotificationsList.updateOne(query, modifier, { multi: true });

  return NotificationsList.findOne(query);
};

module.exports = markAsRead;
