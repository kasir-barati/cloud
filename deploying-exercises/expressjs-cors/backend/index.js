// @ts-check

import cors from 'cors';
import express from 'express';
import { loadEnv } from './load-env';

loadEnv();

const APP_PORT = process.env.APP_PORT ?? 3000;
const app = express();
const whitelist = [
  `http://127.0.0.1:${APP_PORT}`,
  `http://localhost:${APP_PORT}`,
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin(origin, callback) {
      if (whitelist.indexOf(origin) === -1) {
        callback(new Error('Not allowed by CORS'));
        return;
      }
      callback(null, true);
    },
    methods: ['GET', 'PUT', 'POST'],
    credentials: true,
  }),
);

app.put('/', (_req, res) => {
  res.send({ message: 'cors' });
});

app.listen(APP_PORT);

console.log('Server is up and running!');
