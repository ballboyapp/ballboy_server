const organizer = require('./organizer');
const spot = require('./spot');
const chatkitRoomId = require('./chatkit-room-id');
const attendees = require('./attendees');
const isAttendee = require('./is-attendee');

const Activity = {
  organizer,
  spot,
  chatkitRoomId,
  attendees,
  isAttendee,
};

module.exports = Activity;
