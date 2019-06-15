const newChatkitRoom = (root, args, ctx) => {
  // console.log('newChatkitRoomMutation', args, ctx);
  return ctx.models.User.newChatkitRoom(args);
};

module.exports = newChatkitRoom;
