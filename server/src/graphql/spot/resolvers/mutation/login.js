const login = async (root, args, ctx) => {
  console.log('loginMutation', args);
  const user = await ctx.models.User.login(args);
  await ctx.models.User.sendPasscode(args);
  return user;
};

module.exports = login;
