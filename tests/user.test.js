import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { addUsers, userObjs } from './utils';
import app from '../app.js';
import User from '../src/models/User.js';

let mongo;
let users = null;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
  users = await addUsers(userObjs);
});

describe('User', () => {
  test('getting a single user', async () => {
    const userId = users[0]._id.toString();
    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
          query {
            user(_id: "${userId}") {
              _id
              email
              password
              companyName
              transactions {
                productId price quantity status
              }
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.data.user._id).toBe(userId);
    expect(response.body.data.user).toHaveProperty('email');
    expect(response.body.data.user).toHaveProperty('companyName');
    expect(response.body.data.user).toHaveProperty('password');
    expect(response.body.data.user).toHaveProperty('companyName');
    expect(response.body.data.user.transactions.length).toBe(
      userObjs[0].transactions.length,
    );
  });

  test('getting all users', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
          query {
            users {
              _id
              email
              password
              companyName
              transactions {
                productId price quantity status
              }
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.data.users.length).toBe(userObjs.length);
    expect(response.body.data.users[0]).toHaveProperty('email');
    expect(response.body.data.users[0]?.transactions[0]).toHaveProperty('status');
  });

  test('create user mutation', async () => {
    const variablesWithCompany = {
      email: 'test_create_user1@test.com',
      password: '123456',
      companyName: 'Test',
    };
    const variablesWithoutCompany = {
      email: 'test_create_user2@test.com',
      password: '123456',
      companyName: 'Test',
    };

    const response1 = await request(app)
      .post('/graphql')
      .send({
        query: `
        mutation AddUser($email: String!, $password: String!, $companyName: String){
          addUser(email: $email, password: $password, companyName: $companyName) {
            email
            password
            companyName
          }
        }
      `,
        variables: variablesWithCompany,
      });

    const response2 = await request(app)
      .post('/graphql')
      .send({
        query: `
        mutation AddUser($email: String!, $password: String!){
          addUser(email: $email, password: $password) {
            email
            password
            companyName
          }
        }
      `,
        variables: variablesWithoutCompany,
      });

    expect(response1.body.data.addUser).toEqual(variablesWithCompany);
    expect(response2.body.data.addUser).toEqual({
      ...variablesWithoutCompany,
      companyName: null,
    });
  });

  test('update user mutation', async () => {
    const userId = users[0]._id.toString();
    const variables = {
      userInfo: {
        _id: userId,
        password: 'qwerty',
      },
    };

    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
        mutation UpdateUser($userInfo: UserInputType!){
          updateUser(userInfo: $userInfo) {
            _id
            password
          }
        }
      `,
        variables,
      });

    expect(response.body.data.updateUser._id).toBe(userId);
    expect(response.body.data.updateUser.password).toBe(variables.userInfo.password);
  });

  test('delete user mutation', async () => {
    await User.deleteMany({});
    users = await addUsers(userObjs);
    const userId = users[0]._id.toString();
    const delRes = await request(app)
      .post('/graphql')
      .send({
        query: `
        mutation {
          removeUser(_id: "${userId}") {
            _id
          }
        }
      `,
      });

    const getAllRes = await request(app)
      .post('/graphql')
      .send({
        query: `
          query {
            users {
              _id
            }
          }
        `,
      });

    expect(delRes.body.data.removeUser._id).toBe(userId);
    expect(getAllRes.body.data.users.length).toBe(userObjs.length - 1);
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
});
