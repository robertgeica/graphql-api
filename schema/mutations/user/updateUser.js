const { GraphQLNonNull, GraphQLString } = require('graphql');
const User = require('../../../models/User');
const { UserType } = require('../../types/UserType');

const updateUserMutation = {
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
};

module.exports = updateUserMutation;
