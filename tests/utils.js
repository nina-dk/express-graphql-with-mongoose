import Product from '../src/models/Product';
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
        status: 'pending',
      },
      {
        productId: '111111111111111111111112',
        price: 33.4,
        quantity: 1,
        status: 'paid',
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
        status: 'cancel',
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
        status: 'pending',
      },
      {
        productId: '111111111111111111111114',
        price: 100,
        quantity: 2,
        status: 'pending',
      },
    ],
  },
  {
    email: 'test4@test.com',
    password: '123456',
    companyName: 'Monsters Inc.',
  },
];

export const productObjs = [
  {
    title: 'Burger',
    description: 'Cheeseburger with pickles, bacon, tomato & onion.',
    price: 8.9,
  },
  {
    title: 'Fries',
    price: 3.89,
    timesBought: 59,
  },
  {
    title: 'Onion rings',
    description: 'Onion rings',
    price: 5.9,
    timesBought: 25,
  },
];

export const addUser = async userData => {
  const user = new User(userData);
  return user.save();
};

export const addUsers = async users => {
  const userPromises = users.map(addUser);
  return await Promise.all(userPromises);
};

export const addProducts = async products => {
  const pPromises = products.map(async p => {
    const product = new Product(p);
    return product.save();
  });

  return await Promise.all(pPromises);
};
