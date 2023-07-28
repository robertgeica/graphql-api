const { GraphQLList } = require('graphql');
const Note = require('../../../models/Note');
const { NoteType } = require('../../types/NoteType');

const getUserNotes = {
  type: new GraphQLList(NoteType),
  resolve(parent, args, { userId }) {
    if (!userId) {
      throw new Error('You must login first.');
    }
    return Note.find({ userId: { $eq: userId } });
  },
};

module.exports = getUserNotes;