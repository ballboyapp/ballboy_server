const typeDefs = `
  # SCALARS

  scalar Date

  # TYPES

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
`;

module.exports = typeDefs;
