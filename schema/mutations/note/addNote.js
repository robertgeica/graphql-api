const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLEnumType,
} = require('graphql');
const Note = require('../../../models/Note');
const { NoteType } = require('../../types/NoteType');

const addNoteMutation = {
  type: NoteType,
  args: {
    title: { type: GraphQLNonNull(GraphQLString) },
    content: { type: GraphQLNonNull(GraphQLString) },
    visibility: {
      type: new GraphQLEnumType({
        name: 'NoteVisibility',
        values: {
          public: { value: 'Public' },
          private: { value: 'Private' },
        },
      }),
      defaultValue: 'Public',
    },
  },
  resolve(parent, args, { userId }) {
    if (!userId) {
      throw new Error('Unauthorized access. Please log in.');
    }

    const note = new Note({
      title: args.title,
      content: args.content,
      visibility: args.visibility,
      userId,
    });

    return note.save();
  },
};

module.exports = addNoteMutation;
