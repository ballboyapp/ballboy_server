const { SPORTS } = require('./constants');
const { User, Spot } = require('./models');

//------------------------------------------------------------------------------
// Clear DB
// const clearAll = async () => {
//   // await Spot.deleteMany({});
//   // await User.deleteMany({});
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
const spots = async () => {
  const spot = await Spot.findOne({});

  if (spot) {
    return;
  }

  const SPOTS = [{
    spotname: 'Performance Factory',
    address: 'Hoge Bothofstraat 31-49, 7511 ZA Enschede, Netherlands',
    coordinates: [52.2235817, 6.9028977],
    images: ['https://res.cloudinary.com/dp4vo5nq4/image/upload/v1557481330/jfytpw0aa5ioa7v3a4rb.jpg'],
    sports: [SPORTS.FOOTBALL],
  }, {
    spotname: 'Beachveld',
    address: 'Campuslaan, 7522 NB Enschede, Netherlands',
    coordinates: [52.2235817, 6.9028977],
    images: ['https://res.cloudinary.com/dp4vo5nq4/image/upload/v1551798266/kvtqwxbywkp3oae11fjk.jpg'],
    sports: [SPORTS.BEACH_VOLLEYBALL],
  }];

  SPOTS.forEach(async (s) => {
    await Spot.createSpot(s);
  });
};
//------------------------------------------------------------------------------
const fixtures = async () => {
  // clearAll();
  // await users();
  // await spots();
};

module.exports = fixtures;
