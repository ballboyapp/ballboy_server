const addAttendee = async (root, args, ctx) => {
  // console.log('addAttendeeMutation', args, ctx);
  const activity = await ctx.models.Activity.addAttendee(args);
  // await ctx.models.User.sendPasscode(args);
  // TODO: send notifications
  // TODO: create shareLink
  // TODO: create chatkit room
  return activity;
};

module.exports = addAttendee;
