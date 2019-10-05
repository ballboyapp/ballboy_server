const cron = require('node-cron');
const moment = require('moment');
const { ACTIVITY_STATUSES } = require('../constants');
const { Activity } = require('../models');
// const Notifications = require('../services/notifications');

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
// const { APP_DNS } = process.env;

// TODO: use a cronjobs folder and import functions here so that tehy can be
// tested individually
//------------------------------------------------------------------------------
// 5 AM TASK - SET ACTIVITIES TO FINISHED:
//------------------------------------------------------------------------------
cron.schedule('0 5 * * *', async () => {
// cron.schedule('* * * * *', async () => {
  console.log('============================================');
  console.log('running 5am task');

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

  console.log('running 5am task: DONE');
  console.log('============================================');
});
// For testing: db.activities.update({ "_id" : ObjectId("5d416eea3906e802b2c9da50") }, { $set: { "dateTime" : ISODate("2019-07-30T10:35:00Z"), status: "ACTIVE" } })
