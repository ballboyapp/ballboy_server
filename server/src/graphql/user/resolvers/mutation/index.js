const login = require('./login');
const signup = require('./signup');
const sendPasscode = require('./send-passcode');
const updateUser = require('./update-user');

const Mutation = {
  login,
  signup,
  sendPasscode,
  updateUser,
};

module.exports = Mutation;
