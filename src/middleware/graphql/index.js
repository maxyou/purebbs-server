const { gql } = require('apollo-server-koa');
const { user: serviceUser } = require('../../service')

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
  type Post {
    title: String
    id: String
  }
  type Query {
    posts(id: String, length: Int): [Post]
    books: [Book]
    book: Book
  }
  type Mutation {
    updateMsg(arg1: String, arg2: String!): Boolean
    addBook(title: String, author: String): Book
  }
`;

// Provide resolver functions for your schema fields
let msg = ''
const resolvers = {
  Query: {
    posts: async (parent, args, context) => {
      console.log('----------user post-------------')
      console.log(args)
      return await serviceUser.graphql_getUserPosts(args.id, args.length, context)
    },
    books: () => books,
    book: () => book,
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
const posts = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    id: '111',
  },
  {
    title: 'Jurassic Park',
    id: '222',
  },
];