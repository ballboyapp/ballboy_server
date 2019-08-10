const publicUsers = (root, args, ctx) => {
  // console.log('publicUsersQuery', args, ctx);
  return ctx.models.User.getPublicUsers(args);
};

module.exports = publicUsers;
