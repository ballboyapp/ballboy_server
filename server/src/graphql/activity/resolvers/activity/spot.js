const spot = (root, args, ctx) => {
  // console.log('spotField', args);
  return ctx.models.Spot.getSpotDetails({ _id: root.spotId });
};

module.exports = spot;
