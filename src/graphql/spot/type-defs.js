// See: https://github.com/graphql/graphql-js/issues/703
const typeDefs = `
  # ENUMS

  # TYPES

  type Spot {
    _id: ID!
    spotname: String
    address: String
    location: Point
    images: [String]
    sports: [Sport]
    distance: Float # meters
    activities(limit: Int!, offset: Int!): [Activity]
  }

  # INPUTS

  # QUERIES

  type Query {
    spots(
      sports: [Sport],
      distance: Float, # meters
      limit: Int!,
      offset: Int!,
    ): [Spot]

    spotDetails(_id: ID!): Spot
  }

  # MUTATIONS

`;

module.exports = typeDefs;
