// @ts-check

import { resolve } from 'path';

export async function loadEnv() {
  if (process.env.NODE_ENV === 'development') {
    const { config } = await import('dotenv');

    config({
      path: resolve(process.cwd(), '.env'),
    });
  }
}
