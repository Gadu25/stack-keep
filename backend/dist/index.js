import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
const typeDefs = `#graphql
  type Book {
    title: String
    author: String
    publishedYear: Int
    genre: String
  }

  type Query {
    hello: String
    books: [Book]
    bookByTitle(title: String!): Book
  }
`;
const books = [
    { title: 'The Awakening', author: 'Kate Chopin', publishedYear: 1899, genre: 'Fiction' },
    { title: 'City of Glass', author: 'Paul Auster', publishedYear: 1985, genre: 'Mystery' },
    { title: '1984', author: 'George Orwell', publishedYear: 1949, genre: 'Dystopian' },
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', publishedYear: 1937, genre: 'Fantasy' },
];
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        books: () => books,
        bookByTitle: (_parent, args) => books.find(book => book.title === args.title),
    },
};
async function start() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    const app = express();
    app.use('/graphql', cors(), express.json(), (req, res, next) => {
        console.log('req.body:', req.body);
        next();
    }, expressMiddleware(server));
    app.listen(4000, () => {
        console.log('🚀 Server ready at http://localhost:4000/graphql');
    });
}
start();
