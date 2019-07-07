const { Spot } = require('../../models');

const getSpotDetails = ({ usr }, { _id }) => {
  // Make sure user is logged in
  // if (!usr || !usr._id || !_id) {
  //   return null;
  // }

  if (!_id) {
    return null;
  }

  return Spot.findOne({ _id });
};

module.exports = getSpotDetails;
