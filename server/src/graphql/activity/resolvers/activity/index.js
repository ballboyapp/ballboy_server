const organizer = require('./organizer');
const isOrganizer = require('./is-organizer');
const spot = require('./spot');
const chatkitRoomId = require('./chatkit-room-id');
const shareLink = require('./share-link');
const attendees = require('./attendees');
const isAttendee = require('./is-attendee');

const Activity = {
  organizer,
  isOrganizer,
  spot,
  chatkitRoomId,
  shareLink,
  attendees,
  isAttendee,
};

module.exports = Activity;
