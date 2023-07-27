const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');
const User = require('../../models/User');
const { UserInputType, AuthToken, UserType } = require('../types/UserType');

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
    deleteUser: {
      type: UserType,
      args: {},
      resolve(parent, args, { userId }) {
        if (!userId) {
          throw new Error('Unauthorized access. Please log in.');
        }

        return User.findByIdAndDelete(userId);
      },
    },
    updateUser: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args, { userId }) {
        if (!userId) {
          throw new Error('Unauthorized access. Please log in.');
        }

        return User.findByIdAndUpdate(
          userId,
          {
            $set: {
              name: args.name,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = { mutation };
