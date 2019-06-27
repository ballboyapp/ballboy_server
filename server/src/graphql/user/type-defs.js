// See: https://github.com/graphql/graphql-js/issues/703
const typeDefs = `
  # ENUMS

  enum Sport {
    FOOTBALL
  }

  enum City {
    ENSCHEDE
  }

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

  # TYPES

  type AuthToken {
    _id: ID!
    token: String!
  }

  type GeoLocation {
    type: String!
    coordinates: [Int]!
  }

  type UserProfile {
    _id: ID!
    username: String
    avatar: String
    birthdate: Date
    gender: Gender
    language: Language
  }

  type PrivateUser {
    _id: ID!
    createdAt: Date
    email: String
    profile: UserProfile
    location: GeoLocation
  }

  type PublicUser {
    _id: ID!
    profile: UserProfile
  }

  # INPUTS

  input ImageInput {
    _id: ID
    publicId: String!
    secureUrl: String!
  }

  input UserInput {
    username: String
    gender: String
    avatar: String
    coordinates: [Int]
  }

  # QUERIES

  type Query {
    privateUser: PrivateUser
    publicUser(_id: ID!): PublicUser
    publicUsers(_ids: [ID!]): [PublicUser]
  }

  # MUTATIONS

  type Mutation {
    signup(
      username: String!,
      email: String!,
      language: Language!,
    ): PrivateUser
    login(email: String!): PrivateUser
    # sendPasscode(email: String!): PrivateUser
    validatePasscode(email: String!, passcode: Int!): AuthToken
    updateUser(userFields: UserInput!): PrivateUser
  }
`;

module.exports = typeDefs;
