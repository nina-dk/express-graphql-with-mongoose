import { GraphQLList } from 'graphql';
import User from '../../models/User.js';
import UserType from '../types/UserType.js';
import { GraphQLObjectID } from 'graphql-scalars';

const userQueries = {
  users: {
    type: new GraphQLList(UserType),
    resolve: async () => {
      return await User.find();
    },
  },

  user: {
    type: UserType,
    args: {
      _id: { type: GraphQLObjectID },
    },
    resolve: async (_, { _id }) => {
      return await User.findById(_id);
    },
  },
};

export default userQueries;
