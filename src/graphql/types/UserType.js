import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLInputObjectType,
} from 'graphql';
import { GraphQLObjectID } from 'graphql-scalars';

const TransactionStatusEnumType = new GraphQLEnumType({
  name: 'TransactionStatusEnum',
  values: () => ({
    PAID: {
      value: 'paid',
    },
    PENDING: {
      value: 'pending',
    },
    CANCEL: {
      value: 'cancel',
    },
  }),
});

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    productId: { type: GraphQLObjectID },
    price: { type: GraphQLFloat },
    quantity: { type: GraphQLInt },
    status: { type: TransactionStatusEnumType },
  }),
});

const TransactionInputType = new GraphQLInputObjectType({
  name: 'TransactionsInputType',
  fields: () => ({
    productId: { type: GraphQLObjectID },
    price: { type: GraphQLFloat },
    quantity: { type: GraphQLInt },
    status: { type: TransactionStatusEnumType },
  }),
});

export const UserInputType = new GraphQLInputObjectType({
  name: 'UserInputType',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLObjectID) },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    companyName: { type: GraphQLString },
    transactions: {
      type: new GraphQLList(TransactionInputType),
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLObjectID },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    companyName: { type: GraphQLString },
    transactions: {
      type: new GraphQLList(TransactionType),
    },
  }),
});

export default UserType;
