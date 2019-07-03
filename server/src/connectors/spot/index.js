const getSpots = require('./get-spots');
const getSpotDetails = require('./get-spot-details');

/**
 * @see {@link https://blog.apollographql.com/authorization-in-graphql-452b1c402a9}
 * @see {@link https://github.com/apollographql/GitHunt-API/blob/cc67a4506c31310b4ba8d811dda11d258c7d60d6/api/github/models.js}
 * @see {@link https://github.com/apollographql/GitHunt-API/blob/cc67a4506c31310b4ba8d811dda11d258c7d60d6/api/index.js#L67-L73}
 * @see {@link https://github.com/apollographql/GitHunt-API/blob/cc67a4506c31310b4ba8d811dda11d258c7d60d6/api/sql/schema.js#L63}
 */

const genUserModel = ({ usr }) => ({
  getSpots: args => getSpots({ usr }, args),
  getSpotDetails: args => getSpotDetails({ usr }, args),
});

module.exports = genUserModel;
