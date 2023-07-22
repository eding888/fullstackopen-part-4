import express from 'express';
import Blog from '../models/blog.js';
import 'express-async-errors';
const blogsRouter = express.Router();

blogsRouter.get('', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('', async (request, response, next) => {
  const body = request.body;
  const user = request.user;
  console.log(request.user);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  });
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id;
  const user = request.user;
  const blogAtId = await Blog.findById(id).populate('user');

  if (user._id.toString() !== blogAtId.user._id.toString()) {
    return response.status(400).json({ error: 'This is not your blog' });
  };
  user.blogs = user.blogs.filter(blog => !(blog._id === id));
  await user.save();
  const result = await Blog.findByIdAndDelete(id);
  response.status(201).json(result);
});

blogsRouter.delete('/all/confirm', async (request, response) => {
  const result = await Blog.deleteMany();
  response.json(result);
});

export default blogsRouter;
