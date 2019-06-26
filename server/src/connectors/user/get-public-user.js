const { User } = require('../../models');
const { publicUserProjection } = require('../../utils');

const getPublicUser = ({ usr }, { _id }) => {
  console.log('GET PUBLIC USER', _id);
  // Make sure the user is logged in
  if (!usr || !usr._id || !_id) {
    return null;
  }

  return User.findOne({ _id }).select(publicUserProjection);
};

module.exports = getPublicUser;
