const signup = require('./signup');
const login = require('./login');
// const sendPasscode = require('./send-passcode');
const validatePasscode = require('./validate-passcode');
const updateUser = require('./update-user');

const Mutation = {
  signup,
  login,
  // sendPasscode,
  validatePasscode,
  updateUser,
};

module.exports = Mutation;
