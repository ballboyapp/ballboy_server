// const chatkit = require('../../../../services/chatkit');

// const { CHATKIT_USER_ADMIN, CHATKIT_USER_READ_ONLY } = process.env;

const cancelActivity = async (root, args, ctx) => {
  // console.log('cancelActivityMutation', args, ctx);
  const activity = await ctx.models.Activity.cancelActivity(args);
  // TODO: send notifications
  // TODO: paste on chat screen
  return activity;
};

module.exports = cancelActivity;
