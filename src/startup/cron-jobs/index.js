const cron = require('node-cron');
const processActivitiesFinishingToday = require('./process-activities-finishing-today');

cron.schedule('* * * * *', processActivitiesFinishingToday);
// cron.schedule('0 5 * * *', processActivitiesFinishingToday);
