import User from '../models/user.js';
import app from '../app.js';
import helper from './test_helper.js';
import supertest from 'supertest';
import mongoose from 'mongoose';

const api = supertest(app);

beforeEach(async () =>
  await User.deleteMany({}));

test('a user can be created and a blog can be made with its token', async () => {
  const newUser = {
    username: 'buzzlightyear',
    name: 'buss',
    password: 'ambusing'
  };

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const login = {
    username: 'buzzlightyear',
    password: 'ambusing'
  };

  const response = await api
    .post('/api/login')
    .send(login);
  const token = response.body.token;
  console.log('token', token);
  await api
    .post('/api/blogs')
    .set({ Authorization: `bearer ${token}` })
    .send(helper.initialBlogs[0])
    .expect(201)
    .expect('Content-Type', /application\/json/);
});

afterAll(async () => {
  await mongoose.connection.close();
});
