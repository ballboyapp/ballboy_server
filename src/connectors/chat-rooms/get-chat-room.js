const { ChatRooms } = require('../../models');

//------------------------------------------------------------------------------
// HANDLER:
//------------------------------------------------------------------------------
const getChatRoom = async ({ usr }, { roomId }) => {
  // Make sure user is logged in
  if (!usr || !usr._id) {
    return [];
  }

  return ChatRooms.findOne({ _id: roomId });
};

module.exports = getChatRoom;
