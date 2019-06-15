const { User, validateUserUpdate } = require('../../models');

const updateUserProfile = async ({ usr }, { userFields }) => {
  // Only allow owner to update her own data
  if (!usr || !usr._id) {
    return null;
  }

  // TODO: change name to validateUserProfile
  const { error } = validateUserUpdate({ userFields });
  if (error) {
    throw new Error(error.details[0].message);
  }

  // Query current logged in user
  const user = await User.findOne({ _id: usr._id });
  if (!user) {
    return null;
  }

  // Update user data
  return user.updateUserFields({ userFields });
};

module.exports = updateUserProfile;
