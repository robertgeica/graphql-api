const { GraphQLNonNull, GraphQLString } = require('graphql');
const User = require('../../../models/User');
const { AuthToken } = require('../../types/UserType');

const logInMutation = {
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
    return {
      id: user.id,
      email,
      token,
    };
  },
};

module.exports = logInMutation;
