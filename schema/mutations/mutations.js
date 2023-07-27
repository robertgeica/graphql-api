const { GraphQLObjectType } = require('graphql');
const signUpMutation = require('./user/signup');
const logInMutation = require('./user/login');
const deleteUserMutation = require('./user/deleteUser');
const updateUserMutation = require('./user/updateUser');
const addNoteMutation = require('./note/addNote');
const deleteNoteMutation = require('./note/deleteNote');
const updateNoteMutation = require('./note/updateNote');

const mutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    signup: signUpMutation,
    login: logInMutation,
    deleteUser: deleteUserMutation,
    updateUser: updateUserMutation,

    addNote: addNoteMutation,
    deleteNote: deleteNoteMutation,
    updateNote: updateNoteMutation,
  },
});

module.exports = { mutation };
