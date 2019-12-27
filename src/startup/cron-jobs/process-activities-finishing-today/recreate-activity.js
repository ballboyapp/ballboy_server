const moment = require('moment');
const { Activity } = require('../../../models');

// TODO: move this to activity model
const recreateActivity = (activity) => {
  if (!activity || !activity.repeatFrequency) return;
  const newDateTime = moment(activity.dateTime).add(activity.repeatFrequency, 'weeks');
  Activity.createActivity(Object.assign({}, activity, { dateTime: newDateTime })); // Promise
};

module.exports = recreateActivity;
