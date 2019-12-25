const cron = require('node-cron');
const setActivitiesToFinished = require('./set-activities-to-finished');

cron.schedule('0 5 * * *', setActivitiesToFinished);
