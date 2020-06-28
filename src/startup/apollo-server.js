const { ApolloServer } = require('apollo-server-express');
const get = require('lodash/get');
const schema = require('../graphql/exec-schema');
const { User } = require('../models');
const {
  genUserModel,
  genCityModel,
  genSpotModel,
  genActivityModel,
  genNotificationsListModel,
  genChatRoomsModel,
} = require('../connectors');

module.exports = (app) => {
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      // User data is decoded on the validateJwtMiddleware
      const usr = req.user && req.user._id
        ? await User.findOne({ _id: req.user._id })
        : null;

      // TODO: disable in production
      // const usr = await User.findOne({});
      console.log({ loggedInUser: get(usr, 'profile.username', 'unknown') });

      return {
        usr,
        models: {
          User: genUserModel({ usr }),
          City: genCityModel({ usr }),
          Spot: genSpotModel({ usr }),
          Activity: genActivityModel({ usr }),
          NotificationsList: genNotificationsListModel({ usr }),
          ChatRooms: genChatRoomsModel({ usr }),
        },
      };
    },
    // TODO: log errors to winston
    playground: {
      settings: {
        'editor.theme': 'light',
      },
    },
  });

  server.applyMiddleware({ app, path: '/graphql' });
};
