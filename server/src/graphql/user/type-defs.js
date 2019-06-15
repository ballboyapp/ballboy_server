// See: https://github.com/graphql/graphql-js/issues/703
const typeDefs = `
  # ENUMS

  enum Sport {
    FOOTBALL
  }

  enum City {
    ENSCHEDE
  }

  # TYPES

  type AuthToken {
    _id: ID!
    token: String!
  }

  type PrivateUser {
    _id: ID!
    createdAt: Date!
    facebookId: String!
    email: String!
    username: String!
    gender: String
    images: [Image]
  }

  type PublicUser {
    _id: ID!
    username: String!
    gender: String
    images: [Image]
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
    email: String
    images: [ImageInput]
  }

  # QUERIES

  type Query {
    privateUser: PrivateUser
    publicUser(_id: ID!): PublicUser
    publicUsers(_ids: [ID!]): [PublicUser]
  }

  # MUTATIONS

  type Mutation {
    signup(email: String!): PrivateUser!
    sendPasscode(email: String!): PrivateUser!
    login(email: String!, passcode: Int!): AuthToken!
    updateUser(userFields: UserInput!): PrivateUser
  }
`;

module.exports = typeDefs;
