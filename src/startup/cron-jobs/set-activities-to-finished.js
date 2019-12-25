const moment = require('moment');
const { ACTIVITY_STATUSES } = require('../../constants');
const { Activity } = require('../../models');

// For testing: db.activities.update({ "_id" : ObjectId("5d416eea3906e802b2c9da50") }, { $set: { "dateTime" : ISODate("2019-07-30T10:35:00Z"), status: "ACTIVE" } })
const setActivitiesToFinished = async () => {
  console.log('============================================');
  console.log('running SET ACTIVITIES TO FINISHED task');

  const today = moment().startOf('day').toISOString();
  console.log('TODAY', today);

  const query = {
    status: {
      $in: [
        ACTIVITY_STATUSES.ACTIVE,
        ACTIVITY_STATUSES.CANCELED,
      ],
    },
    dateTime: {
      $lt: today,
    },
  };

  const activities = await Activity.find(query).select({ _id: 1, dateTime: 1 });

  activities.forEach(async ({ _id, dateTime }) => {
    console.log('_id', _id, 'dateTime', dateTime);
    await Activity.updateOne({ _id }, { $set: { status: ACTIVITY_STATUSES.FINISHED } });
  });

  console.log('running SET ACTIVITIES TO FINISHED task: DONE');
  console.log('============================================');
};

module.exports = setActivitiesToFinished;
