const moment = require('moment');
const { Activity } = require('../../models');

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
      }
    });

    const res = await Promise.all(promises);
    console.log({ res });
  } catch (e) {
    console.log(e);
    // TODO: log to sentry
  }

  console.log('running SET ACTIVITIES TO FINISHED task: DONE');
  console.log('============================================');
};

module.exports = processActivitiesFinishingToday;
