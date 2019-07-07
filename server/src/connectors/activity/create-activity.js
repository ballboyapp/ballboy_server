const { Activity } = require('../../models');

const createActivity = async ({ usr }, { fields }) => {
  console.log('createActivity.fields', usr, fields);
  // Make sure user is logged in
  if (!usr || !usr._id) {
    return null;
  }

  const { sport, dateTime, spotId, title } = fields;

  if (!sport || !dateTime || !spotId || !title) {
    return null;
  }

  // return Activity.createActivity({ ...fields, organizerId: usr._id });
  const activity = await Activity.createActivity({ ...fields, organizerId: usr._id });
  console.log('activity', activity);
  return activity;
};

module.exports = createActivity;
