const spots = (root, args, ctx) => {
  // console.log('spotsQuery', args);
  return ctx.models.Spot.getSpots(args);
};

module.exports = spots;
