const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLEnumType,
  GraphQLID,
} = require('graphql');
const Note = require('../../models/Note');
const User = require('../../models/User');
const { NoteType } = require('../types/NoteType');
const { UserInputType, AuthToken, UserType } = require('../types/UserType');

const mutation = new GraphQLObjectType({
  name: 'UserMutations',
  fields: {
    addUser: {
      type: UserInputType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const user = new User({
          name: args.name,
          email: args.email,
          password: args.password,
        });
        return user.save();
      },
    },
    login: {
      type: AuthToken,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const { email, password } = args;
        const user = await User.findOne({ email });

        const isPasswordMatch = await user?.matchPasswords(password);
        if (!user || !isPasswordMatch) {
          throw new Error('Invalid credentials or inexistent user');
        }

        const token = user.getSignedJwtToken();
        console.log(email, token);
        return {
          id: user.id,
          email,
          token,
        };
      },
    },
    deleteUser: {
      type: UserType,
      args: {},
      resolve(parent, args, { userId }) {
        if (!userId) {
          throw new Error('Unauthorized access. Please log in.');
        }

        return User.findByIdAndDelete(userId);
      },
    },
    updateUser: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args, { userId }) {
        if (!userId) {
          throw new Error('Unauthorized access. Please log in.');
        }

        return User.findByIdAndUpdate(
          userId,
          {
            $set: {
              name: args.name,
            },
          },
          { new: true }
        );
      },
    },

    // notes
    addNote: {
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
    },
    deleteNote: {
      type: NoteType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve: async (parent, args, { userId }) => {
        const note = await Note.findById(args.id);

        if (!userId || userId !== note.userId.toString()) {
          throw new Error('Unauthorized action.');
        }

        return await Note.findByIdAndDelete(args.id);
      },
    },
    updateNote: {
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
    },
  },
});

module.exports = { mutation };
