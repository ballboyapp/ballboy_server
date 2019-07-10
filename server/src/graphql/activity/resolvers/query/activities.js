const activities = async (root, args, ctx) => {
  // console.log('activitiesQuery', args);
  const acts = await ctx.models.Activity.getActivities(args);
  console.log('activities', acts);
  return acts;
};

module.exports = activities;


// const activities = (root, args, ctx) => {
//   // console.log('activitiesQuery', args);
//   return ctx.models.Activity.getActivities(args);
// };

// module.exports = activities;
