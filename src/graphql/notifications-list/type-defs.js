// See: https://github.com/graphql/graphql-js/issues/703
const typeDefs = `
  # ENUMS

  enum NotificationType {
    NEW_ACTIVITY
    ACTIVITY_CANCELED
    ACTIVITY_RECREATED
    ATTENDEE_ADDED
    ATTENDEE_REMOVED
    NEW_MESSAGE
  }

  # TYPES

  type NotificationUserProfile {
    id: ID!
    name: String!
    avatarURL: String
  }

  type Notification {
    _id: ID!
    createdAt: Date!
    notificationType: NotificationType!
    sender: NotificationUserProfile
    payload: String # JSON stringified object
    didRead: Boolean!
  }

  type NotificationsList {
    _id: ID
    recipient: NotificationUserProfile
    unreadCounter: Int
    items: [Notification]
  }

  # INPUTS

  # QUERIES

  type Query {
    notificationsList: NotificationsList
  }

  # MUTATIONS

  type Mutation {
    markAsRead: NotificationsList
  }
`;

module.exports = typeDefs;
