const createActivity = async (root, args, ctx) => {
  console.log('createActivityMutation', args, ctx);
  const activity = await ctx.models.Activity.createActivity(args);

  console.log('createActivityMutation DONE', activity);
  // await ctx.models.User.sendPasscode(args);
  // TODO: send notifications
  // TODO: create shareLink
  // TODO: create chatkit room
  return activity;
};

module.exports = createActivity;
