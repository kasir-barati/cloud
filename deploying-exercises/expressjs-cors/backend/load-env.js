// @ts-check

import { resolve } from 'path';
import { config } from 'dotenv';

export function loadEnv() {
  config({
    path: resolve(process.cwd(), '.env'),
  });
}
