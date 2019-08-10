const privateUser = require('./private-user');
const publicUser = require('./public-user');
const publicUsers = require('./public-users');

const Query = {
  privateUser,
  publicUser,
  publicUsers,
};

module.exports = Query;
