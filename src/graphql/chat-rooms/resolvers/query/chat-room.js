const chatRoom = (root, args, ctx) => {
  console.log('chatRoom', args);
  return ctx.models.ChatRooms.getChatRoom(args);
};

module.exports = chatRoom;
