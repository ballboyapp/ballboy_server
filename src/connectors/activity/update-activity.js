const { Activity } = require('../../models');

// TODO: make sure spot accepts the given sport
const updateActivity = async ({ usr }, fields) => {
  // console.log('updateActivity', usr, fields);
  // Make sure user is logged in
  if (!usr || !usr._id) {
    return null;
  }

  const {
    _id,
    dateTime,
    // duration,
    // capacity = null,
    spotId,
    title,
    // description = '',
  } = fields;

  if (!_id || !dateTime || !spotId || !title) {
    return null;
  }

  // Make sure user is the owner
  const query = { _id, organizerId: usr._id };

  const activity = await Activity.findOne(query);
  if (!activity) {
    throw new Error('Unauthorized');
  }

  return Activity.updateActivity(fields);
};

module.exports = updateActivity;
