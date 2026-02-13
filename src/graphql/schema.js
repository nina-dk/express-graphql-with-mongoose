import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import userQueries from './queries/user.js';
import userMutations from './mutations/user.js';

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...userQueries,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...userMutations,
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
