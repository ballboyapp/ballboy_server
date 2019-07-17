const updateActivity = (root, args, ctx) => {
  // console.log('updateActivityMutation', args, ctx);
  return ctx.models.Activity.updateActivity(args);
  // TODO: send notifications
};

module.exports = updateActivity;
