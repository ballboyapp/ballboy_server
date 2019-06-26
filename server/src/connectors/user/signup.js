const { User, validateSignup } = require('../../models');

/**
 *
 * @param {string} username
 * @param {string} email
 */
const signup = async ({ usr }, args) => {
  // Make sure user is logged out
  if (usr) {
    return null;
  }

  const { error } = validateSignup(args);
  if (error) {
    console.log('INVALID SIGNUP CREDENTIALS', error);
    throw new Error(error.details[0].message); // Bad request - 400
  }

  // Make sure user doesn't exist already
  const user = await User.findOne({ email: args.email });
  if (user) {
    console.log('USER ALREADY REGISTERED', user);
    throw new Error('Email already in use'); // Bad request - 400
  }

  const newUser = await User.createUser(args);

  return { _id: newUser._id }; // Success request
};

module.exports = signup;
