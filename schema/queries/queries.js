const { GraphQLObjectType, GraphQLList, GraphQLID } = require('graphql');
const Note = require('../../models/Note');
const User = require('../../models/User');
const { NoteType } = require('../types/NoteType');
const { UserType } = require('../types/UserType');

const queries = new GraphQLObjectType({
  name: 'UserQuery',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    loggedUser: {
      type: UserType,
      resolve(parent, args, { userId }) {
        if (!userId) {
          throw new Error('Unauthorized access. Please log in.');
        }

        return User.findById(userId);
      },
    },
    notes: {
      type: new GraphQLList(NoteType),
      resolve(parent, args) {
        return Note.find({ visibility: { $ne: 'Private' } });
      },
    },
    note: {
      type: NoteType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args, { userId }) => {
        const note = await Note.findById(args.id);

        if (note.visibility === 'Public') {
          return note;
        }
        console.log(userId, note.userId);
        if (!userId || userId !== note.userId.toString()) {
          throw new Error(
            'Unauthorized access. You must be the author to access a private note.'
          );
        }

        return note;
      },
    },
    userNotes: {
      type: new GraphQLList(NoteType),
      resolve(parent, args, { userId }) {
        if(!userId) {
          throw new Error("You must login first.")
        }
        return Note.find({ userId: { $eq: userId } });
      },
    }
  },
});

module.exports = { queries };
