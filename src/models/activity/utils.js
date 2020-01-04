const isString = require('lodash/isString');

const getSpotId = (spotId) => {
  if (!spotId) throw new Error('spotId is required');
  return isString(spotId) ? spotId : spotId.toString();
};

module.exports = { getSpotId };
