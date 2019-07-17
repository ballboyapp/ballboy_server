const organizer = require('./organizer');
const isOrganizer = require('./is-organizer');
const spot = require('./spot');
const shareLink = require('./share-link');
const attendees = require('./attendees');
const isAttendee = require('./is-attendee');

const Activity = {
  organizer,
  isOrganizer,
  spot,
  shareLink,
  attendees,
  isAttendee,
};

module.exports = Activity;
