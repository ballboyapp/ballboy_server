const isEmpty = require('lodash/isEmpty');
const extend = require('lodash/extend');
const { Spot } = require('../../models');

const getSpots = ({ usr }, args) => {
  // Make sure user is logged in
  if (!usr || !usr._id) {
    return [];
  }

  const { sports, distance, limit, offset } = args;

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
