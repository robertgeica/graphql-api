const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');
const User = require('../../models/User');
const { UserInputType, AuthToken } = require('../types/UserType');

const mutation = new GraphQLObjectType({
  name: 'UserMutations',
  fields: {
    addUser: {
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
    },
    login: {
      type: AuthToken,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const { email, password } = args;
        const user = await User.findOne({ email });

        const isPasswordMatch = await user?.matchPasswords(password);
        if (!user || !isPasswordMatch) {
          throw new Error('Invalid credentials or inexistent user');
        }

        const token = user.getSignedJwtToken();
        console.log(email, token);
        return {
          id: user.id,
          email,
          token,
        };
      },
    },
  },
});

module.exports = { mutation };
