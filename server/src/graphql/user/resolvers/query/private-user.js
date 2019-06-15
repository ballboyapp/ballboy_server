const privateUser = (root, args, ctx) => {
  // console.log('privateUserQuery', args, ctx);
  return ctx.models.User.getPrivateUser(args);
};

module.exports = privateUser;
