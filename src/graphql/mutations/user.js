import { GraphQLString, GraphQLInt, GraphQLNonNull } from 'graphql';

import User from '../../models/User.js';
import UserType from '../types/UserType.js';

const userMutations = {
  createUser: {
    type: UserType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      age: { type: GraphQLInt },
    },
    resolve: async (_, args) => {
      const user = new User(args);
      return await user.save();
    },
  },

  deleteUser: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_, { id }) => {
      return await User.findByIdAndDelete(id);
    },
  },
};

export default userMutations;
