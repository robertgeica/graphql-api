const { GraphQLList } = require('graphql');
const Note = require('../../../models/Note');
const { NoteType } = require('../../types/NoteType');

const getNotes = {
  type: new GraphQLList(NoteType),
  resolve(parent, args) {
    return Note.find({ visibility: { $ne: 'Private' } });
  },
};

module.exports = getNotes;