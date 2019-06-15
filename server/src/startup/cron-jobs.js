const cron = require('node-cron');
// const moment = require('moment');
// const { User } = require('../models');
// const Notifications = require('../services/notifications');

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
// const { APP_DNS } = process.env;

//------------------------------------------------------------------------------
// 3 AM TASK:
//------------------------------------------------------------------------------
cron.schedule('0 3 * * *', async () => {
// cron.schedule('* * * * *', async () => {
  console.log('============================================');
  console.log('running 3am task');

  // const today = moment().startOf('day').toISOString();

  console.log('running 3am task: DONE');
  console.log('============================================');
});
