// See: https://github.com/graphql/graphql-js/issues/703
const typeDefs = `
  # ENUMS

  enum NotificationType {
    NEW_ACTIVITY
    ACTIVITY_CANCELED
    ACTIVITY_RECREATED
    ATTENDEE_ADDED
    ATTENDEE_REMOVED
  }

  # TYPES

  type Notification {
    _id: ID!
    createdBy: ID
    createdAt: Date!
    recipientId: ID!
    recipient: PublicUser!
    notificationType: NotificationType!
    link: String!
    didRead: Boolean!
  }

  # INPUTS

  # QUERIES

  type Query {
    notifications(limit: Int!, offset: Int!): [Notification]
  }

  # MUTATIONS

  type Mutation {
    markAsRead: [Notification]
  }
`;

module.exports = typeDefs;
