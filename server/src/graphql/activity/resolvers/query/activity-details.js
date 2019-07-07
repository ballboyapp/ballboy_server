const activityDetails = (root, args, ctx) => {
  // console.log('activityDetailsQuery', args);
  return ctx.models.Spot.getActivityDetails(args);
};

module.exports = activityDetails;
