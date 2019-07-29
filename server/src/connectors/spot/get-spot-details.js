const { Spot } = require('../../models');

const getSpotDetails = async ({ usr }, { _id }) => {
  // Make sure user is logged in
  if (!usr || !usr._id || !_id) {
    return null;
  }

  console.log('usr', usr, '_id', _id);

  return Spot.findOne({ _id });

  // const pipeline = [
  //   {
  //     $geoNear: {
  //       near: {
  //         type: 'Point',
  //         coordinates: usr.location.coordinates,
  //       },
  //       query: { _id },
  //       // maxDistance
  //       spherical: true,
  //       distanceField: 'distance', // attaches a 'distance' (meters) field to the doc
  //     },
  //   },
  //   {
  //     $limit: 1,
  //   },
  // ];

  // console.log('AGGREGATION', JSON.stringify(await Spot.aggregate(pipeline)));

  // const spots = await Spot.aggregate(pipeline);

  // return spots && spots.length > 0 ? spots[0] : null;
};

module.exports = getSpotDetails;
