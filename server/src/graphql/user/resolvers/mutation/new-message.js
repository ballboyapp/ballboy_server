const newMessage = (root, args, ctx) => {
  console.log('newMessageMutation', args);
  return ctx.models.User.newMessage(args);
};

module.exports = newMessage;
