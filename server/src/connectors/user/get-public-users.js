const { User } = require('../../models');

const getPublicUsers = ({ usr }, { _ids }) => {
  // Make sure user is logged in
  if (!usr || !usr._id || !_ids) {
    return [];
  }

  return User.find({ _id: { $in: _ids } }).select({ _id: 1, profile: 1 });
};

module.exports = getPublicUsers;
