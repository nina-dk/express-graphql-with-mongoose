import { GraphQLList, GraphQLNonNull } from 'graphql';
import { GraphQLObjectID } from 'graphql-scalars';
import { ProductType } from '../types/ProductType.js';
import Product from '../../models/Product.js';

const productQueries = {
  products: {
    type: new GraphQLList(ProductType),
    resolve: async () => {
      return await Product.find();
    },
  },

  product: {
    type: ProductType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLObjectID) },
    },
    resolve: async (_, { _id }) => {
      return await Product.findById(_id);
    },
  },
};

export default productQueries;
