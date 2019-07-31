const mongoose = require('mongoose');
const isString = require('lodash/isString');
const { Spot } = require('../../models');

const getSpotDetails = async ({ usr }, { _id }) => {
  // Make sure user is logged in
  if (!usr || !usr._id || !_id) {
    return null;
  }

  // console.log(
  //   '_id', _id,
  //   'typeof _id', typeof _id,
  // );

  const pipeline = [
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: usr.location.coordinates,
        },
        query: { _id: isString(_id) ? mongoose.Types.ObjectId(_id) : _id },
        spherical: true,
        distanceField: 'distance', // attaches a 'distance' (meters) field to the doc
      },
    },
    {
      $limit: 1,
    },
  ];

  // console.log('AGGREGATION', JSON.stringify(await Spot.aggregate(pipeline)));

  const spots = await Spot.aggregate(pipeline);

  return spots && spots.length > 0 ? spots[0] : null;
};

module.exports = getSpotDetails;
