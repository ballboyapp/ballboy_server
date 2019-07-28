const isEmpty = require('lodash/isEmpty');
const isNumber = require('lodash/isNumber');
const extend = require('lodash/extend');
const { ACTIVITY_STATUSES } = require('../../constants');
const { Activity } = require('../../models');

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const EARTH_RADIUS = 6378.1; // km
const MAX_RADIUS = 20; // km

//------------------------------------------------------------------------------
// HANDLER:
//------------------------------------------------------------------------------
const getActivities = ({ usr }, { sports, distance, limit, offset }) => {
  // Make sure user is logged in
  if (!usr || !usr._id) {
    return [];
  }

  if (!isNumber(limit) || !isNumber(offset)) {
    return [];
  }

  const query = {
    status: {
      $in: [
        ACTIVITY_STATUSES.ACTIVE,
        ACTIVITY_STATUSES.CANCELED,
      ],
    },
    location: {
      $geoWithin: {
        $centerSphere: [
          usr.location.coordinates, // center (WIRED, it should be [lng, lat] instead of [let, lng])
          (distance || MAX_RADIUS) / EARTH_RADIUS, // radius
        ],
      },
    },
  };

  if (sports && !isEmpty(sports)) {
    extend(query, {
      sport: { $in: sports },
    });
  }

  // TODO: attach distance field via aggregation
  return Activity.find(query).skip(offset).limit(limit).sort({ dateTime: 1 });
};

module.exports = getActivities;
