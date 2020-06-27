const moment = require('moment');
const get = require('lodash/get');
const { NOTIFICATION_TYPES } = require('../../constants');
const {
  User, Activity, NotificationsList, ChatRooms,
} = require('../../models');

// For testing: db.activities.update({ "_id" : ObjectId("5e035018fbbedd3e6b234e9d") }, { $set: { "dateTime" : ISODate("2019-12-25T10:35:00Z"), status: "ACTIVE", repeatFrequency: 1 } })
const processActivitiesFinishingToday = async () => {
  console.log('============================================');
  console.log('running SET ACTIVITIES TO FINISHED task');

  try {
    const today = moment().startOf('day').toISOString();
    const activities = await Activity.getActivitiesFinishingOnDate(today);

    const promises = [];

    activities.forEach((activity) => {
      console.log({ activity });
      promises.push(Activity.setActivityStatusToFinished(activity._id));

      if (activity.repeatFrequency != null) {
        promises.push(async () => {
          try {
            const newActivity = await Activity.recreateActivity(activity);

            // Create chat room
            const room = await ChatRooms.createRoom();

            // Store roomId into activity doc
            await Activity.setChatRoomId({
              _id: newActivity._id,
              chatRoomId: room._id,
            });

            // Insert notifications
            const { organizerId } = newActivity;

            const organizer = await User.findOne({ _id: organizerId });

            if (organizer == null) {
              throw new Error('Organizer not found');
            }

            const notification = {
              notificationType: NOTIFICATION_TYPES.ACTIVITY_RECREATED,
              sender: {
                id: organizerId,
                name: get(organizer, 'profile.username', ''),
                avatarURL: get(organizer, 'profile.avatar', ''),
              },
              payload: {
                activityId: newActivity._id,
                activityTitle: newActivity.title,
              },
            };

            await NotificationsList.insertNotification(organizerId, notification);
          } catch (e) {
            console.log(e);
          }
        });
      }
    });

    await Promise.all(promises);
  } catch (e) {
    console.log(e);
    // TODO: log to sentry
  }

  console.log('running SET ACTIVITIES TO FINISHED task: DONE');
  console.log('============================================');
};

module.exports = processActivitiesFinishingToday;
