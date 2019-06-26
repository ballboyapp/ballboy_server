const { User } = require('../../models');

const getPublicUser = ({ usr }, { _id }) => {
  console.log('GET PUBLIC USER', _id);
  // Make sure the user is logged in
  if (!usr || !usr._id || !_id) {
    return null;
  }

  return User.findOne({ _id }).select({ _id: 1, profile: 1 });
};

module.exports = getPublicUser;
