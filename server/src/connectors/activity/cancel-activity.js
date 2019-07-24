const { ACTIVITY_STATUSES } = require('../../constants');
const { Activity } = require('../../models');

const createActivity = async ({ usr }, { _id }) => {
  // Make sure user is logged in
  if (!usr || !usr._id) {
    return null;
  }

  if (!_id) {
    return null;
  }

  // Make sure user is the owner
  const query = { _id, organizerId: usr._id };
  const activity = await Activity.findOne(query);
  if (!activity) {
    return null;
  }

  await Activity.updateOne(query, { $set: { status: ACTIVITY_STATUSES.CANCELED } });
  return Activity.findOne(query);
};

module.exports = createActivity;
