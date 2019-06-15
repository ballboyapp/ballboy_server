const updateUserProfile = require('./update-user-profile');
const newChatkitRoom = require('./new-chatkit-room');
const newMessage = require('./new-message');
// const setMessageAsSeen = require('./set-message-as-seen');
// const setNotificationsToSeen = require('./set-notifications-to-seen');

const Mutation = {
  updateUserProfile,
  newChatkitRoom,
  newMessage,
  // setMessageAsSeen,
  // setNotificationsToSeen,
};

module.exports = Mutation;
