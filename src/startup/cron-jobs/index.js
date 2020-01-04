const cron = require('node-cron');
const processActivitiesFinishingToday = require('./process-activities-finishing-today');

cron.schedule('0 5 * * *', processActivitiesFinishingToday);
// cron.schedule('* * * * *', processActivitiesFinishingToday);
