const { gql } = require('apollo-server-koa');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
  type Mutation {
    updateMsg(arg1: String, arg2: String!): Boolean
  }
`;

// Provide resolver functions for your schema fields
let msg = ''
const resolvers = {
  Query: {
    hello: () => msg,
  },
  Mutation: {
    updateMsg: (parent, args) => {
      console.log(args)
      msg = args.arg1 + args.arg2
      console.log(msg)
      return true
    }
  }
};

module.exports = {
  typeDefs, 
  resolvers,    
}
