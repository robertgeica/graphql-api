const {
  GraphQLNonNull,
  GraphQLID,
} = require('graphql');
const Note = require('../../../models/Note');
const { NoteType } = require('../../types/NoteType');

const deleteNoteMutation = {
  type: NoteType,
  args: { id: { type: GraphQLNonNull(GraphQLID) } },
  resolve: async (parent, args, { userId }) => {
    const note = await Note.findById(args.id);

    if (!userId || userId !== note.userId.toString()) {
      throw new Error('Unauthorized action.');
    }

    return await Note.findByIdAndDelete(args.id);
  },
};

module.exports = deleteNoteMutation;
