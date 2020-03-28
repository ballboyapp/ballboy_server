const { NotificationsList } = require('../../../../models');

const signup = async (root, args, ctx) => {
  const user = await ctx.models.User.signup(args);

  await ctx.models.User.sendPasscode(args);

  // Register user on NotificationsList
  try {
    await NotificationsList.createUser({
      id: user._id.toString(),
      name: user.profile.username,
    });
  } catch (exc) {
    console.log('Failed registering user to NotificationsList', exc);
    // TODO: log/sentry
  }

  return user;
};

module.exports = signup;
