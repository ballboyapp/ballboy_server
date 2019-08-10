const isNumber = require('lodash/isNumber');
const { ACTIVITY_STATUSES } = require('../../constants');
const { Activity } = require('../../models');

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const MAX_RESULTS = 20;

//------------------------------------------------------------------------------
// HANDLER:
//------------------------------------------------------------------------------
const getSpotActivities = ({ usr }, { spotId, limit, offset }) => {
  console.log('getSpotActivities', { spotId, limit, offset });
  // Make sure user is logged in
  if (!usr || !usr._id || !spotId) {
    return [];
  }

  if (!isNumber(limit) || !isNumber(offset)) {
    return [];
  }

  const query = {
    spotId,
    status: {
      $in: [
        ACTIVITY_STATUSES.ACTIVE,
        ACTIVITY_STATUSES.CANCELED,
      ],
    },
  };

  return Activity.find(query).skip(offset).limit(Math.min(limit, MAX_RESULTS)).sort({ dateTime: 1 });
};

module.exports = getSpotActivities;
