// @ts-check

import { resolve } from 'path';
import { config } from 'dotenv';

export function loadEnv() {
  config({
    path: resolve(process.cwd(), '.env'),
  });
}
export function getEnv() {
  const envs = {
    port: process.env.APP_PORT ?? 3000,
    frontendUrl: process.env.FRONTEND_URL,
  };

  for (const key in envs) {
    if (!envs[key]) {
      const capitalizedKey =
        key[0].toUpperCase() + key.substring(1);
      throw `EmptyEnv${capitalizedKey}`;
    }
  }

  return envs;
}
