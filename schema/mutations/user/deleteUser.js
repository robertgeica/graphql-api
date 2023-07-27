const { GraphQLNonNull, GraphQLString } = require('graphql');
const User = require('../../../models/User');
const { UserType } = require('../../types/UserType');

const deleteUserMutation = {
  type: UserType,
  args: {},
  resolve(parent, args, { userId }) {
    if (!userId) {
      throw new Error('Unauthorized access. Please log in.');
    }

    return User.findByIdAndDelete(userId);
  },
};

module.exports = deleteUserMutation;
