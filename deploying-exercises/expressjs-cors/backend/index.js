// @ts-check

import cors from 'cors';
import express from 'express';
import { loadEnv } from './load-env.js';

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
      // Browser does NOT set the "Origin" header unless the API call's domain is different from the one where the page is being served.
      // Ref: https://stackoverflow.com/a/63684532/8784518
      if (whitelist.indexOf(origin) === -1 && origin) {
        callback(new Error('Not allowed by CORS'));
        return;
      }
      callback(null, true);
    },
    methods: ['GET', 'PUT', 'POST'],
    credentials: true,
  }),
);

app.get('/', (_req, res) => {
  res.status(200).send('<h1>Hi from backend</h1>');
});

app.put('/', (_req, res) => {
  res.send({ message: 'cors' });
});

app.listen(APP_PORT);

console.log('Server is up and running!');
