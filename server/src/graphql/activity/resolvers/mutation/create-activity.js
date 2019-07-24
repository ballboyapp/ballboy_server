const chatkit = require('../../../../services/chatkit');

const { CHATKIT_USER_ADMIN, CHATKIT_USER_READ_ONLY } = process.env;

const createActivity = async (root, args, ctx) => {
  // console.log('createActivityMutation', args, ctx);
  const activity = await ctx.models.Activity.createActivity(args);
  // TODO: send notifications
  // TODO: create shareLink

  try {
    // Create chatkit room
    const room = await chatkit.createRoom({
      creatorId: CHATKIT_USER_ADMIN,
      name: activity._id.toString(),
    });
    // Subscribe to chatkit room
    await chatkit.addUsersToRoom({
      roomId: room.id,
      userIds: [CHATKIT_USER_READ_ONLY],
    });
    // Store roomId into activity doc
    await ctx.models.Activity.setChatkitRoomId({
      _id: activity._id,
      chatkitRoomId: room.id,
    });
  } catch (exc) {
    console.log('Failed creating Chatkit room', exc);
  }

  return activity;
};

module.exports = createActivity;
