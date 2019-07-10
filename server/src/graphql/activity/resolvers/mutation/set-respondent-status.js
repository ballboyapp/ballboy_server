const setRespondentStatus = async (root, args, ctx) => {
  // console.log('setRespondentStatusMutation', args, ctx);
  const activity = await ctx.models.Activity.setRespondentStatus(args);
  // await ctx.models.User.sendPasscode(args);
  // TODO: send notifications
  // TODO: create shareLink
  // TODO: create chatkit room
  return activity;
};

module.exports = setRespondentStatus;
