const publicUser = (root, args, ctx) => (
  // console.log('publicUserQuery', args);
  ctx.models.User.getPublicUser(args)
);

module.exports = publicUser;
