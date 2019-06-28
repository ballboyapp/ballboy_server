// See: https://github.com/graphql/graphql-js/issues/703
const typeDefs = `
  # ENUMS

  # TYPES

  type City {
    _id: ID!
    name: String
    country: String
    coordinates: [Int]
  }

  # INPUTS

  # QUERIES

  type Query {
    cities: [City]!
  }

  # MUTATIONS

`;

module.exports = typeDefs;
