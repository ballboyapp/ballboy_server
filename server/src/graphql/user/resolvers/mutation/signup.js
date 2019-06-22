const signup = (root, args, ctx) => {
  console.log('signupMutation', args, ctx);
  return ctx.models.User.signup(args);
};

module.exports = signup;
