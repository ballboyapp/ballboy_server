const chatkit = require('../../../../services/chatkit');

const signup = async (root, args, ctx) => {
  const user = await ctx.models.User.signup(args);

  await ctx.models.User.sendPasscode(args);

  // Register user on Chatkit
  try {
    await chatkit.createUser({
      id: user._id.toString(),
      name: user.profile.username,
    });
  } catch (exc) {
    console.log('Failed registering user to Chatkit', exc);
  }

  return user;
};

module.exports = signup;
