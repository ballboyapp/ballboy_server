const { City } = require('../../models');

const getCities = ({ usr }, { _id }) => {
  // User could be logged out
  if (!_id) {
    return null;
  }

  return City.findOne({ _id });
};

module.exports = getCities;
