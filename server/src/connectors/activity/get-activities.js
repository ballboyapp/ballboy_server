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
  // if (!usr || !usr._id) {
  //   return [];
  // }

  if (!isNumber(limit) || !isNumber(offset)) {
    return [];
  }

//   var ubRadius = 21; // upper bound radius

//   selector = {
//     'geo.loc': {
//        $geoWithin: {
//           $centerSphere: [
//              [activityLocation.longitude, activityLocation.latitude], // center
//              ubRadius / 6378.1 // radius
//           ]
//        }
//     },
//     'profile.sports': {
//        $in: [match.sport]
//     }
//  };
  const { coordinates } = usr.location;

  const lat = coordinates[0];
  const lng = coordinates[1];

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
          [lng, lat], // center
          (distance || MAX_RADIUS) / EARTH_RADIUS, // radius
        ],
      },
    },
  };

  // TODO: copy location from spot to activity using mongoose hook before querying
  // TODO: sort by distance
  // TODO: attach distance field
  console.log('query', query);

  if (sports && !isEmpty(sports)) {
    extend(query, {
      sport: { $in: sports },
    });
  }

  return Activity.find(query).skip(offset).limit(limit).sort({ dateTime: 1 }); // TODO: sort
};

module.exports = getActivities;
