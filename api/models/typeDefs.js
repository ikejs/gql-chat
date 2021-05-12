const { gql } = require('apollo-server');

module.exports = gql`
type User {
  _id: String!,
  name: String!,
},

type Channel {
  name: String!,
  posts: [Post]
},

type Post {
  author: User!,
  message: String!,
  # date: String!
},

type Query {
  channels: [Channel]!
  channel(_id: String!): Channel!
  user(_id: String!): User!
  author: User!
},

type Mutation {
  addChannel(name: String!): [Channel!]!
},

type Subscription {
  newPost: Post!
},
`;
