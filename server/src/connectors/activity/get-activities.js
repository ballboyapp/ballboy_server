const isEmpty = require('lodash/isEmpty');
const isNumber = require('lodash/isNumber');
const extend = require('lodash/extend');
const { ACTIVITY_STATUSES } = require('../../constants');
const { Activity } = require('../../models');

const getActivities = ({ usr }, { sports, distance, limit, offset }) => {
  // Make sure user is logged in
  // if (!usr || !usr._id) {
  //   return [];
  // }

  if (!isNumber(limit) || !isNumber(offset)) {
    return [];
  }

  const query = { status: ACTIVITY_STATUSES.ACTIVE };

  if (sports && !isEmpty(sports)) {
    extend(query, {
      sport: { $in: sports },
    });
  }

  // if (distance) {
  //   extend(query, {
  //     sports: { $in: sports },
  //   });
  // }

  return Activity.find(query).skip(offset).limit(limit).sort({ dateTime: 1 }); // TODO: sort
};

module.exports = getActivities;
