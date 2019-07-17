const chatkit = require('../../../../services/chatkit');

const { CHATKIT_USER_ID } = process.env;

const createActivity = async (root, args, ctx) => {
  // console.log('createActivityMutation', args, ctx);
  const activity = await ctx.models.Activity.createActivity(args);
  // await ctx.models.User.sendPasscode(args);
  // TODO: send notifications
  // TODO: create shareLink

  console.log('ABOUT TO CREATE CHATKIT ROMM', activity, CHATKIT_USER_ID);

  // Create chatkit room
  try {
    const res = await chatkit.createRoom({
      id: activity._id.toString(),
      creatorId: CHATKIT_USER_ID,
      name: activity._id.toString(),
    });
    console.log('CHATKIT CREATE ROMM RESPONSE', res);
  } catch (exc) {
    console.log('Failed creating Chatkit room', exc);
  }

  return activity;
};

module.exports = createActivity;
