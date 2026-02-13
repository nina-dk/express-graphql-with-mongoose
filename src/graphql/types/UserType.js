import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } from 'graphql';
import { GraphQLObjectID } from 'graphql-scalars';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

export default UserType;
