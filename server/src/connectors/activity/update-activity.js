const { Activity } = require('../../models');

const getActivities = ({ usr }, { fields }) => {
  // Make sure user is logged in
  if (!usr || !usr._id) {
    return null;
  }

  const { sport, dateTime, spotId, title } = fields;

  if (!sport || !dateTime || !spotId || !title) {
    return null;
  }

  return Activity.updateOne(fields);
};

module.exports = getActivities;
