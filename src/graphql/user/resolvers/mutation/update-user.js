const chatkit = require('../../../../services/chatkit');
const { imgUploader } = require('../../../../services/img-uploader');

const updateUser = async (root, args, ctx) => {
  console.log('updateUserMutation', args);
  const { usr } = ctx;

  if (!usr) {
    return null;
  }

  const upUser = await ctx.models.User.updateUser(args);

  // Update chatkit profile
  const {
    username: newUsername,
    avatar: newAvatar,
  } = upUser.profile;

  if (newUsername && newAvatar) {
    try {
      await chatkit.updateUser({
        id: usr._id.toString(),
        name: newUsername,
        avatarURL: newAvatar,
      });
    } catch (exc) {
      console.log('Failed updating user on Chatkit', exc);
    }
  }

  // Remove old avatar from cloudinary
  const { avatar: oldAvatar } = usr.profile;

  if (oldAvatar && newAvatar !== oldAvatar) {
    try {
      await imgUploader.deleteImg(oldAvatar);
    } catch (exc) {
      console.log('Failed removing old image resource', exc);
    }
  }

  return upUser;
};

module.exports = updateUser;
