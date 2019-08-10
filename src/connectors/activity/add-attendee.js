const { ACTIVITY_STATUSES } = require('../../constants');
const { Activity } = require('../../models');

const addAttendee = async ({ usr }, { _id }) => {
  // Make sure user is logged in
  if (!usr || !usr._id) {
    return null;
  }

  if (!_id) {
    return null;
  }

  const activity = await Activity.findOne({ _id });
  if (!activity) {
    throw new Error('Activity not found');
  }

  const { status, capacity = -1, attendeesIds } = activity;

  if (status !== ACTIVITY_STATUSES.ACTIVE) {
    throw new Error('Activity is not active');
  }

  const isAttendee = attendeesIds.includes(usr._id);
  if (isAttendee) {
    throw new Error('You already signed up!');
  }

  const isFull = capacity > 0 && capacity === attendeesIds.length;
  if (isFull) {
    throw new Error('The activity is full');
  }

  await Activity.updateOne({ _id }, { $push: { attendeesIds: usr._id } });

  return Activity.findOne({ _id });
};

module.exports = addAttendee;
