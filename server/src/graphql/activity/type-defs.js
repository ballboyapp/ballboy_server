// See: https://github.com/graphql/graphql-js/issues/703
const typeDefs = `
  # ENUMS

  enum ActivityStatus {
    LIVE
    CANCELED
    FINISHED
  }

  enum RespondentStatus {
    ATTENDING
    DECLINED
  }

  # TYPES

  type Respondent {
    _id: ID!
    userID: ID
    status:
  }

  type Activity {
    _id: ID!
    spotId: ID
    sport: Sport
    dateTime: Date
    duration: Int
    title: String
    description: String
    status: ActivityStatus
    capacity: Int
    shareLink: String
    chatkitRoomId: String
    respondents: [Respondent]
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
#  createActivity(
#    sports: [Sport],
#    distance: Float,
#    limit: Int!,
#    offset: Int!,
#  ): [Activity]

`;

module.exports = typeDefs;
