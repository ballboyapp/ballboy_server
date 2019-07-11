const organizer = require('./organizer');
const spot = require('./spot');
const chatkitRoomId = require('./chatkit-room-id');
const attendees = require('./attendees');

const Activity = {
  organizer,
  spot,
  chatkitRoomId,
  attendees,
};

module.exports = Activity;
