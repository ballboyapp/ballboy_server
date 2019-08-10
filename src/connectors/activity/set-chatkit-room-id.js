const { Activity } = require('../../models');

// DO NOT expose this method to the public
const setChatkitRoomId = async ({ usr }, { _id, chatkitRoomId }) => {
  // Make sure user is logged in
  if (!usr || !usr._id) {
    return null;
  }

  if (!_id || !chatkitRoomId) {
    return null;
  }

  // Make sure user is the owner
  const query = { _id, organizerId: usr._id };

  const activity = await Activity.findOne(query);
  if (!activity) {
    throw new Error('Unauthorized');
  }

  const modifier = { $set: { chatkitRoomId } };
  await Activity.updateOne(query, modifier);
  return Activity.findOne(query);
};

module.exports = setChatkitRoomId;
