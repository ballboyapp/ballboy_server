const createActivity = require('./create-activity');
const updateActivity = require('./update-activity');
const addAttendee = require('./add-attendee');
const removeAttendee = require('./remove-attendee');

const Mutation = {
  createActivity,
  updateActivity,
  addAttendee,
  removeAttendee,
};

module.exports = Mutation;
