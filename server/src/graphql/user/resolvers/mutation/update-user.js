const updateUser = (root, args, ctx) => {
  console.log('updateUserMutation', args);
  return ctx.models.User.updateUser(args);
  // TODO: update chatkit profile
};

module.exports = updateUser;
