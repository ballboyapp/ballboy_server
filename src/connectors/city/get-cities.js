const { City } = require('../../models');

//------------------------------------------------------------------------------
// HANDLER:
//------------------------------------------------------------------------------
const getCities = async ({ usr }) => {
  // Make sure user is logged in
  if (!usr || !usr._id) {
    return [];
  }

  // Return all cities
  return City.find({});
};

module.exports = getCities;
