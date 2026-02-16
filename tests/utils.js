import User from '../src/models/User';

export const userObjs = [
  {
    email: 'test1@test.com',
    password: '123456',
    companyName: 'Test Inc.',
    transactions: [
      {
        productId: '111111111111111111111111',
        price: 25.6,
        quantity: 3,
        status: 'PENDING',
      },
      {
        productId: '111111111111111111111112',
        price: 33.4,
        quantity: 1,
        status: 'PAID',
      },
    ],
  },
  {
    email: 'test2@test.com',
    password: '123456',
    companyName: 'Test Inc.',
    transactions: [
      {
        productId: '111111111111111111111111',
        price: 25.6,
        quantity: 3,
        status: 'CANCEL',
      },
    ],
  },
  {
    email: 'test3@test.com',
    password: '123456',
    companyName: 'Monsters Inc.',
    transactions: [
      {
        productId: '111111111111111111111113',
        price: 10.5,
        quantity: 10,
        status: 'PENDING',
      },
      {
        productId: '111111111111111111111114',
        price: 100,
        quantity: 2,
        status: 'PENDING',
      },
    ],
  },
  {
    email: 'test4@test.com',
    password: '123456',
    companyName: 'Monsters Inc.',
  },
];

export const addUser = async userData => {
  const user = new User(userData);
  return await user.save();
};

export const addUsers = async users => {
  const userPromises = users.map(addUser);
  return await Promise.all(userPromises);
};
