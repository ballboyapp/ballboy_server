const { User } = require('./models');

//------------------------------------------------------------------------------
// Clear DB
// const clearAll = async () => {
//   await City.deleteMany({});
//   await User.deleteMany({});
// };
//------------------------------------------------------------------------------
const users = async () => {
  const user = await User.findOne({});

  if (user) {
    return;
  }

  const testUser = {
    email: 'federodes@gmail.com',
  };

  await User.createUser(testUser);
};
//------------------------------------------------------------------------------
const fixtures = async () => {
  // await users();
};

module.exports = fixtures;
