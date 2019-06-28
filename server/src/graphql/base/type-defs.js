const typeDefs = `
  # SCALARS

  scalar Date

  # TYPES

  type Point {
    type: String!
    coordinates: [Int]!
  }

  type DateRange {
    #_id: ID!
    startDate: Date
    endDate: Date
  }

  type Image {
    _id: ID
    publicId: String!
    secureUrl: String!
  }

  # INPUTS

  input DateRangeInput {
    startDate: String!
    endDate: String!
  }

  input ImageInput {
    _id: ID
    publicId: String!
    secureUrl: String!
  }
`;

module.exports = typeDefs;
