const spotDetails = (root, args, ctx) => {
  // console.log('spotDetailsQuery', args);
  return ctx.models.Spot.getSpotDetails(args);
};

module.exports = spotDetails;
