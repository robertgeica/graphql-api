const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

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

module.exports = { UserInputType, UserType };
