import { GraphQLString, GraphQLNonNull } from 'graphql';

import User from '../../models/User.js';
import UserType from '../types/UserType.js';
import { GraphQLObjectID } from 'graphql-scalars';

const userMutations = {
  addUser: {
    type: UserType,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      companyName: { type: GraphQLString },
    },
    resolve: async (_, args) => {
      const user = new User(args);
      return await user.save();
    },
  },

  updateUser: {
    type: UserType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLObjectID) },
      // email: { type: new GraphQLNonNull(GraphQLString) },
      // password: { type: new GraphQLNonNull(GraphQLString) },
      // companyName: { type: GraphQLString },
    },
    resolve: async (_, args) => {
      return await User.findByIdAndUpdate(id);
    },
  },

  removeUser: {
    type: UserType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_, { id }) => {
      return await User.findByIdAndDelete(id);
    },
  },
};

export default userMutations;
