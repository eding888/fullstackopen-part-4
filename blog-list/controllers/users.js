import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import 'express-async-errors';

const userRouter = express.Router();

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 });
  response.json(users);
});

userRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  const result = await User.findByIdAndDelete(id);
  response.json(result);
});

userRouter.delete('/all/confirm', async (request, response) => {
  const result = await User.deleteMany();
  response.json(result);
});

export default userRouter;
