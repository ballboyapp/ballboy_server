const user = require('./user');
const publicUser = require('./public-user');
const publicUserProfiles = require('./public-user-profiles');

const Query = {
  user,
  publicUser,
  publicUserProfiles,
};

module.exports = Query;
