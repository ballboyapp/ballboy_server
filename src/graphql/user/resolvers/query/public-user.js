const publicUser = (root, args, ctx) => {
  console.log('publicUserQuery', args);
  return ctx.models.User.getPublicUser(args);
};

module.exports = publicUser;
