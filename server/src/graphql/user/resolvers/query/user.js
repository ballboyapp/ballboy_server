const user = (root, args, ctx) => {
  // console.log('userQuery', args, ctx);
  return ctx.models.User.getUser(args);
};

module.exports = user;
