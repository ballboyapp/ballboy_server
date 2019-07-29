const chatkit = require('../../../../services/chatkit');

const updateUser = async (root, args, ctx) => {
  console.log('updateUserMutation', args);
  const user = await ctx.models.User.updateUser(args);

  // Update chatkit profile
  const { username, avatar } = user.profile;

  if (username && avatar) {
    try {
      await chatkit.updateUser({
        id: user._id.toString(),
        name: username,
        avatarURL: avatar,
      });
    } catch (exc) {
      console.log('Failed updating user on Chatkit', exc);
    }
  }

  return user;
};

module.exports = updateUser;
