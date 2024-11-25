// @ts-check

import cors from 'cors';
import express from 'express';
import { getEnv, loadEnv } from './env.helper.js';
import { isNotWhiteListed } from './is-not-whitelisted.js';

loadEnv();

const { port } = getEnv();
const app = express();

app.use(
  cors({
    origin(origin, callback) {
      // Browser does NOT set the "Origin" header unless the API call's domain is different from the one where the page is being served.
      // Ref: https://stackoverflow.com/a/63684532/8784518
      if (origin && isNotWhiteListed(origin)) {
        callback(new Error('Not allowed by CORS'));
        return;
      }
      callback(null, true);
    },
    methods: ['GET', 'PUT', 'POST'],
    credentials: true,
  }),
);

// Note that /api is what we set in our location directive block in our Nginx.
app.get('/api', (_req, res) => {
  res.status(200).send('<h1>Hi from backend</h1>');
});

// Note that /api is what we set in our location directive block in our Nginx.
app.put('/api', (_req, res) => {
  res.send({ message: 'cors' });
});

app.listen(port);

console.log('Server is up and running!');
