const updateUser = (root, args, ctx) => {
  console.log('updateUserMutation', args);
  return ctx.models.User.updateUser(args);
};

module.exports = updateUser;
