const { gql } = require('apollo-server-koa');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Author {
    name: String
    nation: String
  }
  type Book {
    title: String
    author: Author
  }
  type Query {
    books: [Book]
  }
  type Mutation {
    updateMsg(arg1: String, arg2: String!): Boolean
    addBook(title: String, author: String): Book
  }
`;

const book = {
  title: 'Harry Potter and the Chamber of Secrets',
  author: {
    name:'J.K. Rowling',
    nation: 'cn'
  },
}
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// Provide resolver functions for your schema fields
let msg = ''
const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    updateMsg: (parent, args) => {
      console.log(args)
      msg = args.arg1 + args.arg2
      console.log(msg)
      return true
    },
    addBook: (parent, args) => {
      console.log(args)
      return book
    }
  }
};

module.exports = {
  typeDefs,
  resolvers,
}
