const User = require('../../../models/User');
const { UserType } = require('../../types/UserType');

const getLoggedInUser = {
  type: UserType,
  resolve(parent, args, { userId }) {
    if (!userId) {
      throw new Error('Unauthorized access. Please log in.');
    }

    return User.findById(userId);
  },
};
module.exports = getLoggedInUser;
