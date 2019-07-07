const { Activity } = require('../../models');

const createActivity = ({ usr }, { fields }) => {
  // Make sure user is logged in
  if (!usr || !usr._id) {
    return [];
  }

  const { sport, dateTime, spotId, title } = fields;

  if (!sport || !dateTime || !spotId || !title) {
    return null;
  }

  return Activity.createActivity(fields);
};

module.exports = createActivity;
