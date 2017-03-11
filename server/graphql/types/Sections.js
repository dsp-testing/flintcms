const { GraphQLInputObjectType, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLList } = require('graphql');

const outputType = new GraphQLObjectType({
  name: 'Sections',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    title: {
      type: GraphQLString,
    },
    slug: {
      type: GraphQLString,
    },
    fields: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
      description: '`id`s of fields',
    },
    dateCreated: {
      type: GraphQLString,
      description: 'Date Created',
    },
    template: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

const inputType = new GraphQLInputObjectType({
  name: 'SectionsInput',
  fields: {
    title: {
      type: GraphQLString,
    },
    template: {
      type: GraphQLString,
    },
    fields: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
      description: '`id`s of fields',
    },
  },
});

module.exports = {
  outputType,
  inputType,
};
