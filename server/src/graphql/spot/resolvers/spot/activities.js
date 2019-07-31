const activities = (root, args, ctx) => {
  // console.log('activitiesField', root, args);
  const { limit, offset } = args;
  return ctx.models.Activity.getSpotActivities({ spotId: root._id, limit, offset });
};

module.exports = activities;
