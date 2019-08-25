const { ApolloServer } = require('apollo-server-express');
const schema = require('../graphql/exec-schema');
const { User } = require('../models');
const {
  genUserModel,
  genSpotModel,
  genActivityModel,
} = require('../connectors');

module.exports = (app) => {
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      // User data is decoded on the validateJwtMiddleware
      const usr = req.user && req.user._id
        ? await User.findOne({ _id: req.user._id })
        : null;

      // TODO: disable on production
      // const usr = await User.findOne({});

      return {
        usr,
        models: {
          User: genUserModel({ usr }),
          Spot: genSpotModel({ usr }),
          Activity: genActivityModel({ usr }),
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