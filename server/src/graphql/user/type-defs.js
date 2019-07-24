// See: https://github.com/graphql/graphql-js/issues/703
const typeDefs = `
  # ENUMS

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

    updateUser(
      username: String,
      gender: String,
      avatar: String,
      city: String,
      country: String,
      coordinates: [Float],
    ): PrivateUser
    # TODO: delete user
  }
`;

module.exports = typeDefs;
