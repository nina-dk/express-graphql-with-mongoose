import { GraphQLList, GraphQLID } from 'graphql';
import User from '../../models/User.js';
import UserType from '../types/UserType.js';

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
      id: { type: GraphQLID },
    },
    resolve: async (_, { id }) => {
      return await User.findById(id);
    },
  },
};

export default userQueries;
