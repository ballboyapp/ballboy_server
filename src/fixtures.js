const { SPORTS } = require('./constants');
const {
  User, City, Spot, Notification,
} = require('./models');

//------------------------------------------------------------------------------
// Clear DB
// const clearAll = async () => {
//   // await Spot.deleteMany({});
//   // await User.deleteMany({});
//   // await City.deleteMany({});
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
const cities = async () => {
  const city = await City.findOne({});

  if (city) {
    return;
  }

  const CITIES = [{
    name: 'Amsterdam',
    country: 'Netherlands',
    formattedAddress: 'Amsterdam, Netherlands',
    coordinates: [52.354733, 4.8284116],
  }, {
    name: 'Enschede',
    country: 'Netherlands',
    formattedAddress: 'Enschede, Netherlands',
    coordinates: [52.220615, 6.895782],
  }, {
    name: 'Rotterdam',
    country: 'Netherlands',
    formattedAddress: 'Rotterdam, Netherlands',
    coordinates: [51.92806, 4.420195],
  }, {
    name: 'Barcelona',
    country: 'Spain',
    formattedAddress: 'Barcelona, Spain',
    coordinates: [41.394897, 2.0785563],
  }, {
    name: 'Buenos Aires',
    country: 'Argentina',
    formattedAddress: 'Buenos Aires, Argentina',
    coordinates: [-34.61566, -58.50351],
  }];

  CITIES.forEach(async (c) => {
    await City.createCity(c);
  });
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
  }, {
    spotname: 'Erasmuspad',
    address: 'Erasmuspad 9, 3052 KP Rotterdam, Netherlands',
    coordinates: [51.947885, 4.4654503],
    images: ['https://res.cloudinary.com/dp4vo5nq4/image/upload/v1573942160/RKSV_Leonidas.jpg'],
    sports: [SPORTS.FOOTBALL],
  }, {
    spotname: 'De Wilgenring',
    address: 'Melanchtonweg 70, 3052 KV Rotterdam, Netherlands',
    coordinates: [51.9486202, 4.4696616],
    images: ['https://res.cloudinary.com/dp4vo5nq4/image/upload/v1573942600/sportcentrum-wilgenring-9.jpg'],
    sports: [
      SPORTS.BASKETBALL,
      SPORTS.FOOTBALL,
      SPORTS.BADMINTON,
      SPORTS.VOLLEYBALL,
    ],
  }, {
    spotname: 'Hazelaarweg',
    address: 'Hazelaarweg 40, 3053 PM Rotterdam, Netherlands',
    coordinates: [51.9659456, 4.4778496],
    images: ['https://res.cloudinary.com/dp4vo5nq4/image/upload/v1573943474/zGvMldtztetiBCWSIknLM4WbSy0S636BjkyHAl8s.jpg'],
    sports: [SPORTS.FOOTBALL],
  }, {
    spotname: 'Kralingen',
    address: 'Slaak 15, 3061 CR Rotterdam, Netherlands',
    coordinates: [51.9257414, 4.4969802],
    images: ['https://res.cloudinary.com/dp4vo5nq4/image/upload/v1573943603/Y1j8TBSxQzlefAtRc044jNg7twpRpbo9FoRSFC6s.jpg'],
    sports: [
      SPORTS.BASKETBALL,
      SPORTS.FOOTBALL,
      SPORTS.BADMINTON,
      SPORTS.VOLLEYBALL,
    ],
  }];

  SPOTS.forEach(async (s) => {
    await Spot.createSpot(s);
  });
};
//------------------------------------------------------------------------------
// const notifications = async () => {
//   const notification = await Notification.findOne({});

//   if (notification) {
//     return;
//   }

//   const testNotification = {
//     recipientId: '5e1065c85f83d61a9b3a0e98',
//     notificationType: 'NEW_ACTIVITY',
//   };

//   await Notification.createNotification(testNotification);
// };
//------------------------------------------------------------------------------
const fixtures = async () => {
  // clearAll();
  // await users();
  await cities();
  await spots();
  // await notifications();
};

module.exports = fixtures;
