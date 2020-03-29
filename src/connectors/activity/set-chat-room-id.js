const { Activity } = require('../../models');

// DO NOT expose this method to the public
const setChatRoomId = async ({ usr }, { _id, chatRoomId }) => {
  // Make sure user is logged in
  if (!usr || !usr._id) {
    return null;
  }

  if (!_id || !chatRoomId) {
    return null;
  }

  // Make sure user is the owner
  const query = { _id, organizerId: usr._id };

  const activity = await Activity.findOne(query);
  if (!activity) {
    throw new Error('Unauthorized');
  }

  const modifier = { $set: { chatRoomId } };
  await Activity.updateOne(query, modifier);
  return Activity.findOne(query);
};

module.exports = setChatRoomId;
