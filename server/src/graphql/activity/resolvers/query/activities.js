const activities = (root, args, ctx) => {
  // console.log('activitiesQuery', args);
  return ctx.models.Activity.getActivities(args);
};

module.exports = activities;
