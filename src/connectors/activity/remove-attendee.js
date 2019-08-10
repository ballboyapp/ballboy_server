const { ACTIVITY_STATUSES } = require('../../constants');
const { Activity } = require('../../models');

const removeAttendee = async ({ usr }, { _id }) => {
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

  const { status, attendeesIds } = activity;

  if (status !== ACTIVITY_STATUSES.ACTIVE) {
    throw new Error('Activity is not active');
  }

  const isAttendee = attendeesIds.includes(usr._id);
  if (!isAttendee) {
    throw new Error('You are not an attendee!');
  }

  await Activity.updateOne({ _id }, { $pull: { attendeesIds: usr._id } });

  return Activity.findOne({ _id });
};

module.exports = removeAttendee;
