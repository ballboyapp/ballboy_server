// See: https://github.com/graphql/graphql-js/issues/703
const typeDefs = `
  # ENUMS

  # TYPES

  type ChatRoomUserProfile {
    id: ID!
    name: String!
    avatarURL: String
  }

  type Message {
    _id: ID!
    createdAt: Date!
    sender: ChatRoomUserProfile
    text: String!
  }

  type ChatRoom {
    _id: ID
    messages: [Message]
  }

  # INPUTS

  # QUERIES

  type Query {
    chatRoom(roomId: ID!): ChatRoom
  }

  # MUTATIONS

  type Mutation {
    sendMessage(roomId: ID!, text: String!): ChatRoom
  }
`;

module.exports = typeDefs;
