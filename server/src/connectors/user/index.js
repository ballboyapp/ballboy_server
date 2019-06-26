const signup = require('./signup');
const login = require('./login');
const sendPasscode = require('./send-passcode');
const validatePasscode = require('./validate-passcode');
const updateUser = require('./update-user');
const getPrivateUser = require('./get-private-user');
const getPublicUser = require('./get-public-user');
const getPublicUsers = require('./get-public-users');

/**
 * @see {@link https://blog.apollographql.com/authorization-in-graphql-452b1c402a9}
 * @see {@link https://github.com/apollographql/GitHunt-API/blob/cc67a4506c31310b4ba8d811dda11d258c7d60d6/api/github/models.js}
 * @see {@link https://github.com/apollographql/GitHunt-API/blob/cc67a4506c31310b4ba8d811dda11d258c7d60d6/api/index.js#L67-L73}
 * @see {@link https://github.com/apollographql/GitHunt-API/blob/cc67a4506c31310b4ba8d811dda11d258c7d60d6/api/sql/schema.js#L63}
 */

const genUserModel = ({ usr }) => ({
  signup: args => signup({ usr }, args),
  login: args => login({ usr }, args),
  sendPasscode: args => sendPasscode({ usr }, args),
  validatePasscode: args => validatePasscode({ usr }, args),
  updateUser: args => updateUser({ usr }, args),
  getPrivateUser: args => getPrivateUser({ usr }, args),
  getPublicUser: args => getPublicUser({ usr }, args),
  getPublicUsers: args => getPublicUsers({ usr }, args),
});

module.exports = genUserModel;
