const isEmpty = require('lodash/isEmpty');
const isNumber = require('lodash/isNumber');
const extend = require('lodash/extend');
const { ACTIVITY_STATUSES } = require('../../constants');
const { Activity } = require('../../models');

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const MAX_RADIUS = 20000; // mts
const MAX_RESULTS = 20;

//------------------------------------------------------------------------------
// HANDLER:
//------------------------------------------------------------------------------
const getActivities = async ({ usr }, { sports, distance, limit, offset }) => {
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
  };

  if (sports && !isEmpty(sports)) {
    extend(query, {
      sport: { $in: sports },
    });
  }

  const pipeline = [
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: usr.location.coordinates,
        },
        query,
        maxDistance: distance || MAX_RADIUS, //  meters
        spherical: true,
        distanceField: 'distance', // attaches a 'distance' (meters) field to the doc
      },
    },
    {
      $sort: { dateTime: 1 },
    },
    {
      $skip: offset || 0,
    },
    {
      $limit: limit ? Math.min(limit, MAX_RESULTS) : MAX_RESULTS,
    },
  ];

  // console.log('AGGREGATION', JSON.stringify(await Spot.aggregate(pipeline)));
  return Activity.aggregate(pipeline);
};

module.exports = getActivities;


// const isEmpty = require('lodash/isEmpty');
// const isNumber = require('lodash/isNumber');
// const extend = require('lodash/extend');
// const { ACTIVITY_STATUSES } = require('../../constants');
// const { Activity } = require('../../models');

// //------------------------------------------------------------------------------
// // CONSTANTS:
// //------------------------------------------------------------------------------
// const EARTH_RADIUS = 6378.1; // km
// const MAX_RADIUS = 20; // km

// //------------------------------------------------------------------------------
// // HANDLER:
// //------------------------------------------------------------------------------
// const getActivities = ({ usr }, { sports, distance, limit, offset }) => {
//   // Make sure user is logged in
//   if (!usr || !usr._id) {
//     return [];
//   }

//   if (!isNumber(limit) || !isNumber(offset)) {
//     return [];
//   }

//   const query = {
//     status: {
//       $in: [
//         ACTIVITY_STATUSES.ACTIVE,
//         ACTIVITY_STATUSES.CANCELED,
//       ],
//     },
//     location: {
//       $geoWithin: {
//         $centerSphere: [
//           usr.location.coordinates, // center (WIRED, it should be [lng, lat] instead of [let, lng])
//           (distance || MAX_RADIUS) / EARTH_RADIUS, // radius
//         ],
//       },
//     },
//   };

//   if (sports && !isEmpty(sports)) {
//     extend(query, {
//       sport: { $in: sports },
//     });
//   }

//   // TODO: attach distance field via aggregation
//   return Activity.find(query).skip(offset).limit(limit).sort({ dateTime: 1 });
// };

// module.exports = getActivities;
