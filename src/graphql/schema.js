import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
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

// import RootMutation from './mutations/index.js';
// import RootQuery from './queries/index.js';

// const RootQuery = new GraphQLObjectType({
//   name: 'Query',
//   fields: {
//     hello: {
//       type: GraphQLString,
//       resolve: () => 'Hello GraphQL!',
//     },
//   },
// });
