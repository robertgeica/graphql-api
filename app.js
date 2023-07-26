require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const { connectDatabase } = require('./database/mongodb');
const { mutation } = require('./schema/mutations/mutations');
const { queries } = require('./schema/queriess/queries');

const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || 'http://localhost';

const app = express();

connectDatabase();

app.use(
  '/graphql',
  graphqlHTTP({
    schema:  new GraphQLSchema({
      query: queries,
      mutation,
    }),
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(4000);

console.log(`Running a GraphQL API server at ${BASE_URL}:${PORT}/graphql`);
