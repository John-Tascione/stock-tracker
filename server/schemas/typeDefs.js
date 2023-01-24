const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    stocks: [Stock]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Stock {
    _id: ID!
    ticker: String
  }

  type Query {
    users(username: String): [User]
    me: User
  }

  type Mutation {
    createUser(
      username: String!,
      email: String!,
      password: String!): Auth
    
    loginUser(
      email: String!, 
      password: String!): Auth
  }
`;

module.exports = typeDefs;
