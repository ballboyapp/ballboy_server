const { User, validateLogin } = require('../../models');

const login = async ({ usr }, { email }) => {
  // Make sure user is logged out
  if (usr) {
    return null;
  }

  if (!email) {
    throw new Error('Email is missing'); // Bad request - 400
  }

  const { error } = validateLogin({ email });
  if (error) {
    console.log('INVALID EMAIL', error);
    throw new Error(error.details[0].message); // Bad request - 400
  }

  // Make sure user exists
  const user = await User.findOne({ email });
  if (!user) {
    console.log('USER DOES NOT EXIST');
    throw new Error('Invalid email'); // Bad request - 400
  }

  return { _id: user._id }; // Successful request
};

module.exports = login;
