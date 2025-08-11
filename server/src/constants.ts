import * as dotenv from 'dotenv';

dotenv.config();

const { DB_CONNECT, PORT } = process.env;

export const CONSTANTS = {
  DB_CONNECT,
  PORT,
};
