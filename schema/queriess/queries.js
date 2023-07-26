const { GraphQLObjectType, GraphQLList, GraphQLID } = require('graphql');
const User = require('../../models/User');
const { UserType } = require('../types/UserType');

const queries = new GraphQLObjectType({
  name: 'UserQuery',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
  },
});

module.exports = { queries };
