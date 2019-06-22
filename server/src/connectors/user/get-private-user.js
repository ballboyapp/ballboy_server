const { User } = require('../../models');

const getPrivateUser = ({ usr }) => {
  // Make sure user is logged in
  if (!usr || !usr._id) {
    return null;
  }

  // Query current logged in user
  return User.findOne({ _id: usr._id });
};

module.exports = getPrivateUser;
