// See: https://github.com/graphql/graphql-js/issues/703
const typeDefs = `
  # ENUMS

  enum ActivityStatus {
    ACTIVE
    CANCELED
    FINISHED
    DELETED
  }

  enum RespondentStatus {
    ATTENDING
    DECLINED
  }

  # TYPES

  type Activity {
    _id: ID!
    organizer: PublicUser
    spot: Spot
    sport: Sport
    dateTime: Date
    duration: Int
    title: String
    description: String
    status: ActivityStatus
    capacity: Int
    shareLink: String
    chatkitRoomId: String
    attendeesIds: [ID]
    attendees: [PublicUser]
    isAttendee: Boolean
  }

  # INPUTS

  input ActivityInput {
    sport: Sport!
    dateTime: String!
    duration: Int
    capacity: Int
    spotId: ID!
    title: String!
    description: String
  }

  # QUERIES

  type Query {
    activities(
      sports: [Sport],
      distance: Float,
      limit: Int!,
      offset: Int!,
    ): [Activity]
    activityDetails(_id: ID!): Activity
  }

  # MUTATIONS

  type Mutation {
    createActivity(fields: ActivityInput!): Activity
    updateActivity(fields: ActivityInput!): Activity
    # delete
    # cancel
    addAttendee(_id: ID!): Activity
    removeAttendee(_id: ID!): Activity
  }
`;

module.exports = typeDefs;
