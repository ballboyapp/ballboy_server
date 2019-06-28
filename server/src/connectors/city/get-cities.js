const { City } = require('../../models');

const getCities = () => (
  // User could be logged out
  City.find({})
);

module.exports = getCities;
