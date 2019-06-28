const { CITIES } = require('./constants');
const { City, User } = require('./models');

//------------------------------------------------------------------------------
// Clear DB
const clearAll = async () => {
  await City.deleteMany({});
  await User.deleteMany({});
};
//------------------------------------------------------------------------------
const cities = async () => {
  const city = await City.findOne({});

  if (city) {
    return;
  }

  CITIES.forEach(async (c) => {
    await City.createCity(c);
  });
};
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
  await clearAll();
  await cities();
  // await users();
};

module.exports = fixtures;
