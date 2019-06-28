const get = require('lodash/get');

const coordinates = (root) => {
  // console.log('coordinatesField', root, args);
  return get(root, 'location.coordinates', [0, 0]);
};

module.exports = coordinates;
