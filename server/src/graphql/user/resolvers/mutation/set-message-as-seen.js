const setMessageAsSeen = (root, args, ctx) => {
  console.log('setMessageAsSeenMutation', args);
  return ctx.models.User.setMessageAsSeen(args);
};

module.exports = setMessageAsSeen;
