const createActivity = require('./create-activity');
const updateActivity = require('./update-activity');
const cancelActivity = require('./cancel-activity');
const addAttendee = require('./add-attendee');
const removeAttendee = require('./remove-attendee');

const Mutation = {
  createActivity,
  updateActivity,
  cancelActivity,
  addAttendee,
  removeAttendee,
};

module.exports = Mutation;
