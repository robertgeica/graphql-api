const { GraphQLNonNull, GraphQLString } = require('graphql');
const User = require('../../../models/User');
const { UserInputType } = require('../../types/UserType');

const signUpMutation = {
  type: UserInputType,
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve(parent, args) {
    const user = new User({
      name: args.name,
      email: args.email,
      password: args.password,
    });
    return user.save();
  },
};

module.exports = signUpMutation;
