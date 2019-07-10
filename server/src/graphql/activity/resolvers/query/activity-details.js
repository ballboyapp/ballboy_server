const activityDetails = async (root, args, ctx) => {
  // console.log('activityDetailsQuery', args);
  return ctx.models.Activity.getActivityDetails(args);
};

module.exports = activityDetails;
