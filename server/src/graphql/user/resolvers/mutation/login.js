const login = (root, args, ctx) => {
  // console.log('loginMutation', args, ctx);
  return ctx.models.User.login(args);
};

module.exports = login;
