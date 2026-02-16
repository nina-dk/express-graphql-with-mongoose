import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import userQueries from './queries/user.js';
import userMutations from './mutations/user.js';
import productQueries from './queries/product.js';
import productMutations from './mutations/product.js';

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...userQueries,
    ...productQueries,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...userMutations,
    ...productMutations,
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
