const { GraphQLList} = require('graphql');
const User = require('../../../models/User');
const { UserType } = require('../../types/UserType');

const getUsers = {
    type: new GraphQLList(UserType),
    resolve(parent, args) {
      return User.find();
    },
}
module.exports = getUsers;