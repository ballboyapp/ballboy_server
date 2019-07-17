const isEmpty = require('lodash/isEmpty');
const isNumber = require('lodash/isNumber');
const extend = require('lodash/extend');
const { Spot } = require('../../models');

const getSpots = ({ usr }, { sports, distance, limit, offset }) => {
  // Make sure user is logged in
  // if (!usr || !usr._id) {
  //   return [];
  // }

  if (!isNumber(limit) || !isNumber(offset)) {
    return [];
  }

  const query = {};

  if (sports && !isEmpty(sports)) {
    extend(query, {
      sports: { $in: sports },
    });
  }

  // if (distance) {
  //   extend(query, {
  //     sports: { $in: sports },
  //   });
  // }

  return Spot.find(query).skip(offset).limit(limit); // TODO: sort
};

module.exports = getSpots;