const { Activity } = require('../../models');

// TODO: make sure spot accepts the given sport
const createActivity = ({ usr }, fields) => {
  // Make sure user is logged in
  if (!usr || !usr._id) {
    return null;
  }

  const { sport, dateTime, spotId, title } = fields;

  if (!sport || !dateTime || !spotId || !title) {
    return null;
  }

  return Activity.createActivity({ ...fields, organizerId: usr._id });
};

module.exports = createActivity;
