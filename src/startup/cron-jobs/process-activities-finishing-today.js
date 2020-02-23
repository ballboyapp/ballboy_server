const moment = require('moment');
const get = require('lodash/get');
const { NOTIFICATION_TYPES } = require('../../constants');
const { User, Activity, NotificationsList } = require('../../models');

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
        promises.push(Activity.recreateActivity(activity));

        promises.push(async () => {
          const { organizerId } = activity;

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
              activityId: activity._id,
              activityTitle: activity.title,
            },
          };

          await NotificationsList.insertNotification(organizerId, notification);
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
