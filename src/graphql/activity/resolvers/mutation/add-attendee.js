const get = require('lodash/get');
const { NotificationsList } = require('../../../../models');
const { NOTIFICATION_TYPES } = require('../../../../constants');

/**
 * Add current logged in user to the list of attendees
 * @param {Object} root activity doc
 * @param {Object} args { _id } // activity id
 * @param {Object} ctx { usr, models, ... }
 */
const addAttendee = async (root, args, ctx) => {
  // console.log('addAttendeeMutation', args, ctx);
  const { usr } = ctx;

  if (usr == null) {
    return null;
  }

  const activity = await ctx.models.Activity.addAttendee(args);

  if (activity != null) {
    const notification = {
      notificationType: NOTIFICATION_TYPES.ATTENDEE_ADDED,
      sender: {
        id: usr._id,
        name: get(usr, 'profile.username', ''),
        avatarURL: get(usr, 'profile.avatar', ''),
      },
      payload: {
        activityId: activity._id,
      },
    };

    // Send notification to all attendees plus the organizer
    const promises = activity.getUsersExcept(usr._id).map(userId => (
      NotificationsList.insertNotification(userId, notification)
    ));

    await Promise.all(promises);
  }

  return activity;
};

module.exports = addAttendee;
