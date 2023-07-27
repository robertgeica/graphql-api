const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');
const { UserType } = require('./UserType');


const NoteType = new GraphQLObjectType({
  name: 'NoteType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    visibility: { type: GraphQLString },
    user: {
      type: UserType,
      ressolve(parent, args) {
        return User.FindById(parent.userId);
      }
      
    }
  }),
});


module.exports = { NoteType };
