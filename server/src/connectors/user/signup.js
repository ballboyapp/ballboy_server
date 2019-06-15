const { User, validateSignup } = require('../../models');

const signup = async ({ usr }, { email }) => {
  // Make sure user is logged out
  if (usr) {
    return null;
  }

  const { error } = validateSignup({ email });
  if (error) {
    console.log('INVALID SIGNUP CREDENTIALS', error);
    throw new Error(error.details[0].message); // Bad request - 400
  }

  // Make sure user doesn't exist already
  const user = await User.findOne({ email });
  if (user) {
    console.log('USER ALREADY REGISTERED', user);
    throw new Error('Email already in use'); // Bad request - 400
  }

  return User.createUser({ email }); // Success request
};

module.exports = signup;
