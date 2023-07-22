// HANDLE THE EXPORT OF DOTENV VALUES

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGO_URL
  : process.env.MONGO_URL;

export default { PORT, MONGO_URL };
