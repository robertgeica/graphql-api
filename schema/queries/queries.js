const { GraphQLObjectType, GraphQLList, GraphQLID } = require('graphql');
const Note = require('../../models/Note');
const { NoteType } = require('../types/NoteType');
const getUsers = require('./user/getUsers');
const getUser = require('./user/getUser');
const getLoggedInUser = require('./user/getLoggedInUser');
const getNotes = require('./note/getNotes');
const getNote = require('./note/getNote');
const getUserNotes = require('./note/getUserNotes');

const queries = new GraphQLObjectType({
  name: 'RootQueries',
  fields: {
    users: getUsers,
    user: getUser,
    loggedUser: getLoggedInUser,

    notes: getNotes,
    note: getNote,
    userNotes: getUserNotes,
  },
});

module.exports = { queries };
