const { imgUploader } = require('../../../../services/img-uploader');

const updateUser = async (root, args, ctx) => {
  console.log('updateUserMutation', args);
  const { usr } = ctx;

  if (!usr) {
    return null;
  }

  const upUser = await ctx.models.User.updateUser(args);

  // TODO: Update chat room profile?

  // Remove old avatar from cloudinary
  const { avatar: newAvatar } = upUser.profile;
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
