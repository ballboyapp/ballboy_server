const moment = require('moment');
const cloneDeep = require('lodash/cloneDeep');
const extend = require('lodash/extend');
const omit = require('lodash/omit');
const { Activity } = require('../../../models');

// TODO: move this to activity model
const recreateActivity = (activity) => {
  console.log('\n\nrecreateActivity', activity);
  if (!activity || !activity.repeatFrequency) return null;
  const newDateTime = moment(activity.dateTime).add(activity.repeatFrequency, 'weeks');
  const newActivity = omit(cloneDeep(activity), '_id');
  extend(newActivity, { dateTime: newDateTime, attendeesIds: [newActivity.organizerId] });
  return Activity.createActivity(newActivity); // Promise
};

module.exports = recreateActivity;
