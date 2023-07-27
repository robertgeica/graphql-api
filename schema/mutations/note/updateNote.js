const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLEnumType,
  GraphQLID,
} = require('graphql');
const Note = require('../../../models/Note');
const { NoteType } = require('../../types/NoteType');

const updateNoteMutation = {
  type: NoteType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    visibility: {
      type: new GraphQLEnumType({
        name: 'NoteVisibilityUpdate',
        values: {
          public: { value: 'Public' },
          private: { value: 'Private' },
        },
      }),
    },
  },
  resolve: async (parent, args, { userId }) => {
    const note = await Note.findById(args.id);

    if (!userId || userId !== note.userId.toString()) {
      throw new Error('Unauthorized action.');
    }

    return Note.findByIdAndUpdate(
      args.id,
      {
        $set: {
          title: args.title,
          content: args.content,
          visibility: args.visibility,
        },
      },
      { new: true }
    );
  },
};

module.exports = updateNoteMutation;
