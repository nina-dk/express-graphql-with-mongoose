import { GraphQLString, GraphQLNonNull, GraphQLFloat } from 'graphql';
import { GraphQLObjectID } from 'graphql-scalars';
import Product from '../../models/Product.js';
import User from '../../models/User.js';
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
      userId: { type: new GraphQLNonNull(GraphQLObjectID) },
    },
    resolve: async (_, { _id, userId }) => {
      const product = await Product.findByIdAndUpdate(
        _id,
        { $inc: { timesBought: 1 } },
        { returnDocument: 'after' },
      );

      await User.findByIdAndUpdate(userId, {
        $push: {
          transactions: {
            productId: product._id,
            price: product.price,
            quantity: 1,
            status: 'pending',
          },
        },
      });

      return product;
    },
  },
};

export default productMutations;
