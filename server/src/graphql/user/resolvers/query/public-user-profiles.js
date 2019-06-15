const publicUserProfiles = (root, args, ctx) => {
  // console.log('publicUserProfilesQuery', args, ctx);
  return ctx.models.User.getPublicUserProfiles(args);
};

module.exports = publicUserProfiles;
