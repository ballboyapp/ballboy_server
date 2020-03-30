const { NotificationsList, Activity } = require('../../../../models');
const { NOTIFICATION_TYPES } = require('../../../../constants');

/**
 * Add text message to the given roomId
 * @param {Object} root chatRoom doc
 * @param {Object} args { roomId, text }
 * @param {Object} ctx { usr, models, ... }
 */
const sendMessage = async (root, args, ctx) => {
  // console.log('sendMessageMutation', args, ctx);
  const message = await ctx.models.ChatRooms.sendMessage(args);

  // Send notifications
  const { sender } = message;

  try {
    const activity = await Activity.findOne({ chatRoomId: args.roomId });

    if (activity == null) {
      throw new Error('Activity not found');
    }

    const notification = {
      notificationType: NOTIFICATION_TYPES.NEW_MESSAGE,
      sender,
      payload: {
        activityId: activity._id,
        activityTitle: activity.title,
        chatRoomId: args.roomId,
      },
    };

    // Send notification to all attendees plus the organizer
    const promises = activity.getUsersExcept(sender.id).map(userId => (
      NotificationsList.insertNotification(userId, notification)
    ));

    await Promise.all(promises);
  } catch (exc) {
    // TODO: log to sentry
    console.log({ exc });
  }

  return message;
};

module.exports = sendMessage;
