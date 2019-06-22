const { User } = require('../../models');
const { publicUserProjection } = require('../../utils');

const getPublicUsers = ({ usr }, { _ids }) => {
  // Make sure user is logged in
  if (!usr || !usr._id || !_ids) {
    return [];
  }

  return User.find({ _id: { $in: _ids } }).select(publicUserProjection);
};

module.exports = getPublicUsers;
