// See: https://github.com/graphql/graphql-js/issues/703
const typeDefs = `
  # ENUMS

  enum Sport {
    FOOTBALL
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

  type UserProfile {
    _id: ID!
    username: String
    avatar: String
    birthdate: Date
    gender: Gender
    language: Language
    city: String
    country: String
  }

  type PrivateUser {
    _id: ID!
    createdAt: Date
    email: String
    profile: UserProfile
    location: Point
  }

  type PublicUser {
    _id: ID!
    profile: UserProfile
  }

  # INPUTS

  input UserInput {
    username: String
    gender: String
    avatar: String
    city: String
    country: String
    coordinates: [Int]
  }

  # QUERIES

  type Query {
    privateUser: PrivateUser # TODO: change name to 'me'
    publicUser(_id: ID!): PublicUser # TODO: change name to 'user'
    publicUsers(_ids: [ID!]): [PublicUser] # TODO: change name to 'users'
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
