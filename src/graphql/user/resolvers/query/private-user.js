const privateUser = (root, args, ctx) => (
  // console.log('privateUserQuery', args);
  ctx.models.User.getPrivateUser(args)
);

module.exports = privateUser;
