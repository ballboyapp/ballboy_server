const activities = (root, args, ctx) => (
  // console.log('activitiesQuery', args);
  ctx.models.Activity.getActivities(args)
);

module.exports = activities;
