// See: https://github.com/graphql/graphql-js/issues/703
const typeDefs = `
  # ENUMS

  # TYPES

  type City {
    _id: ID!
    name: String
    country: String
    formattedAddress: String
    location: Point
  }

  # INPUTS

  # QUERIES

  type Query {
    cities: [City]
  }

  # MUTATIONS

`;

module.exports = typeDefs;
