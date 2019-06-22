const { User, validateUserProfile } = require('../../models');

const updateUser = async ({ usr }, { userFields }) => {
  // Only allow owner to update her own data
  if (!usr || !usr._id) {
    return null;
  }

  const { error } = validateUserProfile({ userFields });
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

module.exports = updateUser;
