const updateUserProfile = (root, args, ctx) => {
  console.log('updateUserProfileMutation', args);
  return ctx.models.User.updateUserProfile(args);
};

module.exports = updateUserProfile;
