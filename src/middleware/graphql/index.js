const { gql } = require('apollo-server-koa');
const { user: serviceUser, sys: serviceSys } = require('../../service')
const { GraphQLScalarType, Kind } = require('graphql');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  scalar Date

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
    postId: String
    created: Date
    category: String
  }
  type TopUser {
    name: String
    role: String
    postNum: Int
  }
  type CategoryPostNum {
    name: String
    postNum: Int
  }
  type Query {
    categoryPostNum: [CategoryPostNum]
    topUser(length: Int): [TopUser]
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
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
  Query: {
    categoryPostNum: async (parent, args, context) => {
      console.log('################$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$----------categoryPostNum-------------')
      console.log(args)
      
      return await serviceSys.graphql_getPostNumByCategory()
    },
    topUser: async (parent, args, context) => {
      // console.log('################$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$----------topUser-------------')
      // console.log(args)
      return await serviceSys.graphql_getTopUserByPostNum(args, context)
    },
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