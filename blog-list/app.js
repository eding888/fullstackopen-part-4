import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './utils/config.js';
import middleware from './utils/middleware.js';
import blogsRouter from './controllers/blogs.js';
import userRouter from './controllers/users.js';
import loginRouter from './controllers/login.js';

const app = express();

const { MONGO_URL } = config;
console.log(MONGO_URL);
mongoose.set('strictQuery', false);

mongoose.connect(MONGO_URL)
  .then(response => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Error:', error);
  });

app.use(express.json());
app.use(cors());
app.use(express.static('build'));
app.use(middleware.getTokenFrom);
app.use(middleware.getUserFromToken);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
