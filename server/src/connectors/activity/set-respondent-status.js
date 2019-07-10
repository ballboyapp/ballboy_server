const { ACTIVITY_STATUSES, RESPONDENT_STATUSES } = require('../../constants');
const { Activity } = require('../../models');
const { getAttendees } = require('../../utils');

const setRespondentStatus = async ({ usr }, { _id, status: respStatus }) => {
  // Make sure user is logged in
  if (!usr || !usr._id) {
    return null;
  }

  if (!_id || !respStatus) {
    return null;
  }

  const activity = await Activity.findOne({ _id });
  if (!activity) {
    throw new Error('Activity not found');
  }

  const { status, capacity = -1, respondents } = activity;

  if (status !== ACTIVITY_STATUSES.ACTIVE) {
    throw new Error('Activity is not active');
  }

  const userResp = respondents.find(r => r.userId === usr._id);
  // userResp = { userId, status } || undefined
  const attendees = getAttendees(respondents);
  const isFull = capacity > 0 && capacity === attendees.length;

  // Make sure capacity is not passed
  if (isFull && respStatus === RESPONDENT_STATUSES.ATTENDING) {
    throw new Error('The activity is full');
  }

  // If user is a respondent
  if (userResp) {
    await Activity.updateOne({ _id, 'respondents._id': userResp._id }, { $set: { 'respondents.$.status': respStatus } });
  } else {
    await Activity.updateOne({ _id }, { $push: { respondents: { userId: usr._id, status: respStatus } } });
  }

  return Activity.findOne({ _id });
};

module.exports = setRespondentStatus;
