const removeAttendee = async (root, args, ctx) => {
  // console.log('removeAttendeeMutation', args, ctx);
  const activity = await ctx.models.Activity.removeAttendee(args);
  // await ctx.models.User.sendPasscode(args);
  // TODO: send notifications
  // TODO: create shareLink
  // TODO: create chatkit room
  return activity;
};

module.exports = removeAttendee;
