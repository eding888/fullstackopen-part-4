import User from '../models/user.js';

const initialBlogs = [
  {
    title: 'test',
    author: 'testy mctesterson',
    url: 'test.com',
    likes: 16,
    id: 123
  },
  {
    title: 'test',
    author: 'testy mctesterson',
    url: 'test.com',
    likes: 14,
    id: 123
  },
  {
    title: 'test',
    author: 'testy mctesterson',
    url: 'test.com',
    likes: 15,
    id: 123
  }
];

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

export default {
  initialBlogs, usersInDb
};
