const User = require('./user');
const Query = require('./query');
const Mutation = require('./mutation');

const resolvers = {
  PrivateUser: User,
  PublicUser: User,
  Query,
  Mutation,
};

module.exports = resolvers;
