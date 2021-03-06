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
    isOrganizer: Boolean
    spot: Spot
    sport: Sport
    dateTime: Date
    duration: Int
    title: String
    description: String
    status: ActivityStatus
    capacity: Int
    shareLink: String
    chatRoomId: String
    attendeesIds: [ID]
    attendees: [PublicUser]
    isAttendee: Boolean
    distance: Float # meters
    repeatFrequency: Int # weeks. 0 means do not repeat
  }

  # INPUTS

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
    createActivity(
      sport: Sport!,
      dateTime: String!,
      duration: Int,
      capacity: Int,
      spotId: ID!,
      title: String!,
      description: String,
      repeatFrequency: Int,
    ): Activity

    updateActivity(
      _id: ID!,
      dateTime: String!,
      duration: Int,
      capacity: Int,
      spotId: ID!,
      title: String!,
      description: String,
      repeatFrequency: Int,
    ): Activity

    cancelActivity(_id: ID!, msg: String): Activity

    # deleteActivity

    addAttendee(_id: ID!): Activity

    removeAttendee(_id: ID!): Activity

    #newMessage(_id: ID!, senderId!): Activity
  }
`;

module.exports = typeDefs;
