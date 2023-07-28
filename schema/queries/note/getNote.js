const { GraphQLID } = require('graphql');
const Note = require('../../../models/Note');
const { NoteType } = require('../../types/NoteType');

const getNote = {
  type: NoteType,
  args: { id: { type: GraphQLID } },
  resolve: async (parent, args, { userId }) => {
    const note = await Note.findById(args.id);

    if (note.visibility === 'Public') {
      return note;
    }
    if (!userId || userId !== note.userId.toString()) {
      throw new Error(
        'Unauthorized access. You must be the author to access a private note.'
      );
    }

    return note;
  },
};

module.exports = getNote;