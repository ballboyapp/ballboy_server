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
    coordinates: [52.2236654, 6.9029265],
    images: ['https://res.cloudinary.com/dp4vo5nq4/image/upload/v1557481330/jfytpw0aa5ioa7v3a4rb.jpg'],
    sports: [SPORTS.FOOTBALL],
  }, {
    spotname: 'Rigtersbleek',
    address: 'G.J. van Heekstraat 15, 7521 EB Enschede, Netherlands',
    coordinates: [52.2263591, 6.8730052],
    images: ['https://res.cloudinary.com/dp4vo5nq4/image/upload/v1564347619/IMG_20180601_184705_761-ConvertImage.jpg'],
    sports: [SPORTS.FOOTBALL],
  }, {
    spotname: 'Beachveld',
    address: 'Campuslaan, 7522 NB Enschede, Netherlands',
    coordinates: [52.2462745, 6.8494801],
    images: ['https://res.cloudinary.com/dp4vo5nq4/image/upload/v1551798266/kvtqwxbywkp3oae11fjk.jpg'],
    sports: [SPORTS.BEACH_VOLLEYBALL],
  }, {
    spotname: 'Lage Filterweg',
    address: 'Lage Filterweg 16, 3063 SB Rotterdam, Netherlands',
    coordinates: [51.9105469, 4.5218993],
    images: ['https://res.cloudinary.com/dp4vo5nq4/image/upload/v1564348028/52706501_579245615905290_6640661627421065216_n.jpg'],
    sports: [SPORTS.FOOTBALL],
  }];

  SPOTS.forEach(async (s) => {
    await Spot.createSpot(s);
  });
};
//------------------------------------------------------------------------------
const fixtures = async () => {
  // clearAll();
  // await users();
  await spots();
};

module.exports = fixtures;
