const spotDetails = (root, args, ctx) => (
  // console.log('spotDetailsQuery', args);
  ctx.models.Spot.getSpotDetails(args)
);

module.exports = spotDetails;
