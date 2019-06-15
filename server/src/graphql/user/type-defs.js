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

  type User { # PrivateUser
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
    user: User
    publicUser(_id: ID!): PublicUser
    publicUserProfiles(_ids: [ID!]): [PublicUser]
  }

  # MUTATIONS

  type Mutation {
    updateUserProfile(userFields: UserInput!): User
    newChatkitRoom(roomName: String!, recipientId: ID!): User
    newMessage(roomName: String!, recipientId: ID!): User
    # setMessageAsSeen(roomName: String!): User
    # setNotificationsToSeen(field: NotificationField!, listIds: [ID!]): User
  }
`;

module.exports = typeDefs;
