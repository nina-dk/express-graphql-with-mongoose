import { GraphQLString, GraphQLNonNull } from 'graphql';

import User from '../../models/User.js';
import UserType, { UserInputType } from '../types/UserType.js';
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
      userInfo: { type: UserInputType },
    },
    resolve: async (_, { userInfo: { _id, ...deets } }) => {
      return await User.findByIdAndUpdate(_id, deets, { new: true });
    },
  },

  removeUser: {
    type: UserType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_, { _id }) => {
      return await User.findByIdAndDelete(_id);
    },
  },
};

export default userMutations;
