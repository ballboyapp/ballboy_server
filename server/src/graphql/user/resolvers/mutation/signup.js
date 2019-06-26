const signup = async (root, args, ctx) => {
  // console.log('signupMutation', args);
  const user = await ctx.models.User.signup(args);
  await ctx.models.User.sendPasscode(args);
  return user;
};

module.exports = signup;
