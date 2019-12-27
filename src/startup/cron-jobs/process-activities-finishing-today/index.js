const getActivitiesFinishingToday = require('./get-activities-finishing-today');
const setActivityStatusToFinished = require('./set-activity-status-to-finished');
const recreateActivity = require('./recreate-activity');

// For testing: db.activities.update({ "_id" : ObjectId("5d416eea3906e802b2c9da50") }, { $set: { "dateTime" : ISODate("2019-07-30T10:35:00Z"), status: "ACTIVE" } })
const processActivitiesFinishingToday = async () => {
  console.log('============================================');
  console.log('running SET ACTIVITIES TO FINISHED task');

  const activities = await getActivitiesFinishingToday();

  activities.forEach(async (activity) => {
    console.log({ activity });
    await setActivityStatusToFinished(activity);
    await recreateActivity(activity);
  });

  console.log('running SET ACTIVITIES TO FINISHED task: DONE');
  console.log('============================================');
};

module.exports = processActivitiesFinishingToday;
