// @ts-check

import { resolve } from 'path';
import { config } from 'dotenv';

export function loadEnv() {
  config({
    path: resolve(process.cwd(), '.env'),
  });
}
export function getEnv() {
  loadEnv();

  const envs = {
    port: process.env.APP_PORT ?? 3000,
    frontendUrl: process.env.FRONTEND_URL,
  };

  console.group();
  console.log(process.env.FRONTEND_URL);
  console.log(process.env.APP_PORT);
  console.dir(envs, { depth: null });
  console.groupEnd();

  for (const key in envs) {
    if (!envs[key]) {
      console.error(envs[key]);

      const capitalizedKey =
        key[0].toUpperCase() + key.substring(1);
      throw `EmptyEnv${capitalizedKey}`;
    }
  }

  return envs;
}
