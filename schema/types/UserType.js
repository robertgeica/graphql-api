const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

const UserInputType = new GraphQLObjectType({
  name: 'UserInput',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const AuthToken = new GraphQLObjectType({
  name: 'AuthToken',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLNonNull(GraphQLString) },
    token: { type: GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = { UserInputType, UserType, AuthToken };
