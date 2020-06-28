const chatRoom = (root, args, ctx) => (
  // console.log('chatRoom', args);
  ctx.models.ChatRooms.getChatRoom(args)
);

module.exports = chatRoom;
