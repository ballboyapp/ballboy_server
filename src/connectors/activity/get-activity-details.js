const { Activity } = require('../../models');

const getActivityDetails = ({ usr }, { _id }) => {
  // Make sure user is logged in
  // if (!usr || !usr._id) {
  //   return [];
  // }

  if (!_id) {
    return null;
  }

  return Activity.findOne({ _id });
};

module.exports = getActivityDetails;
