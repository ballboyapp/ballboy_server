const setNotificationsToSeen = (root, args, ctx) => {
  console.log('setNotificationsToSeenMutation', args);
  return ctx.models.User.setNotificationsToSeen(args);
};

module.exports = setNotificationsToSeen;
