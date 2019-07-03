const typeDefs = `
  # SCALARS

  scalar Date

  # ENUMS

  enum Gender {
    F
    M
    TBD
  }

  enum Language {
    en
    es
    nl
  }

  enum Sport {
    FOOTBALL
    VOLLEYBALL
    BEACH_VOLLEYBALL
    TENNIS
    TABLE_TENNIS
    ABSOLUTE_FRISBEE
    BASKETBALL
    BADMINTON
  }

  # TYPES

  type Point {
    type: String!
    coordinates: [Float]!
  }

  type DateRange {
    #_id: ID!
    startDate: Date
    endDate: Date
  }

  # type Image {
  #   _id: ID
  #   publicId: String!
  #   secureUrl: String!
  # }

  # INPUTS

  input DateRangeInput {
    startDate: String!
    endDate: String!
  }

  # input ImageInput {
  #   _id: ID
  #   publicId: String!
  #   secureUrl: String!
  # }
`;

module.exports = typeDefs;
