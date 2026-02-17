import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { addProducts, productObjs, addUsers, userObjs } from './utils';
import app from '../app.js';

let mongo;
let products = null;
let users = null;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
  products = await addProducts(productObjs);
  users = await addUsers(userObjs);
});

describe('Product', () => {
  test('getting a single product', async () => {
    const productId = products[0]._id.toString();
    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
          query {
            product(_id: "${productId}") {
              _id title description price timesBought
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.data.product._id).toBe(productId);
    expect(response.body.data.product).toHaveProperty('title');
    expect(response.body.data.product).toHaveProperty('description');
    expect(response.body.data.product).toHaveProperty('price');
    expect(response.body.data.product).toHaveProperty('timesBought');
  });

  test('getting all products', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
          query {
            products {
              _id title description price timesBought
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.data.products.length).toBe(productObjs.length);
    expect(response.body.data.products[0]).toHaveProperty('price');
  });

  test('buyProduct mutation increases timesBought property', async () => {
    const productId = products[0]._id.toString();
    const userId = users[0]._id.toString();

    const response1 = await request(app)
      .post('/graphql')
      .send({
        query: `
        mutation {
          buyProduct(_id: "${productId}", userId: "${userId}") {
            _id timesBought
          }
        }
      `,
      });

    const response2 = await request(app)
      .post('/graphql')
      .send({
        query: `
        mutation {
          buyProduct(_id: "${productId}", userId: "${userId}") {
            _id timesBought
          }
        }
      `,
      });

    expect(response1.body.data.buyProduct._id).toBe(productId);
    expect(response1.body.data.buyProduct.timesBought).toBe(
      products[0].timesBought + 1,
    );
    expect(response2.body.data.buyProduct.timesBought).toBe(
      products[0].timesBought + 2,
    );
  });

  test('buyProduct adds a transaction to the user with resolved product', async () => {
    const productId = products[1]._id.toString();
    const userId = users[3]._id.toString(); // user with no transactions

    await request(app)
      .post('/graphql')
      .send({
        query: `
        mutation {
          buyProduct(_id: "${productId}", userId: "${userId}") {
            _id
          }
        }
      `,
      });

    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
        query {
          user(_id: "${userId}") {
            transactions {
              productId
              product {
                _id title price
              }
              price
              quantity
              status
            }
          }
        }
      `,
      });

    const transactions = response.body.data.user.transactions;
    expect(transactions.length).toBe(1);
    expect(transactions[0].productId).toBe(productId);
    expect(transactions[0].product._id).toBe(productId);
    expect(transactions[0].product.title).toBe(productObjs[1].title);
    expect(transactions[0].quantity).toBe(1);
    expect(transactions[0].status).toBe('PENDING');
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
});
