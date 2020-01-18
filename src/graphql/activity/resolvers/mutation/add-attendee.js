const addAttendee = async (root, args, ctx) => {
  // console.log('addAttendeeMutation', args, ctx);
  const activity = await ctx.models.Activity.addAttendee(args);
  // TODO: send notifications
  return activity;
};

module.exports = addAttendee;
