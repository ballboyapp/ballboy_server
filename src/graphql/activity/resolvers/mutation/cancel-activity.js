// const chatkit = require('../../../../services/chatkit');

const cancelActivity = async (root, args, ctx) => {
  // console.log('cancelActivityMutation', args, ctx);
  const activity = await ctx.models.Activity.cancelActivity(args);
  // TODO: send notifications
  // TODO: paste on chat screen
  return activity;
};

module.exports = cancelActivity;
