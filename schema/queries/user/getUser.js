const { GraphQLID } = require('graphql');
const User = require('../../../models/User');
const { UserType } = require('../../types/UserType');

const getUser = {
  type: UserType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return User.findById(args.id);
  },
};
module.exports = getUser;
