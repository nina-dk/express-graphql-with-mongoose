import { GraphQLString, GraphQLNonNull, GraphQLFloat } from 'graphql';
import { GraphQLObjectID } from 'graphql-scalars';
import Product from '../../models/Product.js';
import { ProductType } from '../types/ProductType.js';

const productMutations = {
  addProduct: {
    type: ProductType,
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
      price: { type: GraphQLFloat },
    },
    resolve: async (_, args) => {
      const product = new Product(args);
      return await product.save();
    },
  },

  buyProduct: {
    type: ProductType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLObjectID) },
    },
    resolve: async (_, { _id }) => {
      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { timesBought: 1 } },
        { new: true },
      );
    },
  },
};

export default productMutations;
