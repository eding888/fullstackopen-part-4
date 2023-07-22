import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import Blog from '../models/blog.js';
import helper from './test_helper.js';

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects =
    helper.initialBlogs.map(blog => new Blog(blog));
  const promises =
    blogObjects.map(blogObject => blogObject.save());
  await Promise.all(promises);
});

const api = supertest(app);

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});
test('there are two notes', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'test',
    author: 'testy mctesterson',
    url: 'test.com',
    likes: 16
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  const contents = response.body.map(r => r.title);

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(contents).toContain(
    'test'
  );
});

test('all blogs have unique ids', async () => {
  const uniqueIds = new Set();
  let pass = true;
  const blogs = (await api.get('/api/blogs')).body;

  blogs.forEach((blog) => {
    const id = blog.id;
    if ((id === undefined) || uniqueIds.has(id)) {
      pass = false;
    } else {
      uniqueIds.add(id);
    }
  });
  expect(pass).toBe(true);
});

test('default likes count is 0', async () => {
  const noLikesBlog = {
    title: 'test',
    author: 'tester',
    url: 'test.com'
  };

  const responseAfterPost = await api.post('/api/blogs').send(noLikesBlog);
  const likes = responseAfterPost.body.likes;

  expect(likes).toBe(0);
});

test('error code 400 after missing title or author', async () => {
  const noTitleBlog = {
    author: 'tester',
    url: 'test.com',
    likes: 12
  };

  const noAuthorBlog = {
    title: 'test',
    url: 'test.com',
    likes: 12
  };

  const responseNoTitle = await api.post('/api/blogs').send(noTitleBlog);
  const responseNoAuthor = await api.post('/api/blogs').send(noAuthorBlog);

  expect(responseNoTitle.status).toBe(400);
  expect(responseNoAuthor.status).toBe(400);
});

afterAll(async () => {
  await mongoose.connection.close();
});
