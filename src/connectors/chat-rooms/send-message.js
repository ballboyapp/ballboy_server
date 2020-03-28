const get = require('lodash/get');
const { ChatRooms } = require('../../models');

const sendMessage = async ({ usr }, { roomId, text }) => {
  // Make sure user is logged in
  if (!usr || !usr._id) {
    return null;
  }

  const sender = {
    id: usr._id,
    name: get(usr, 'profile.username', ''),
    avatarURL: get(usr, 'profile.avatar', ''),
  };

  return ChatRooms.insertMessage({ roomId, sender, text });
};

module.exports = sendMessage;
