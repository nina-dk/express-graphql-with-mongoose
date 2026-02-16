import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
} from 'graphql';
import { GraphQLObjectID } from 'graphql-scalars';

export const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    _id: { type: GraphQLObjectID },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    timesBought: { type: GraphQLInt },
  }),
});
