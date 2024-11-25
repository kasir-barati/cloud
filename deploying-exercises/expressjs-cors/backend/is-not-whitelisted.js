// @ts-check

import { getEnv } from './load-env.js';

const { port, frontendUrl } = getEnv();

const whitelist = [
  `http://127.0.0.1:${port}`,
  `http://localhost:${port}`,
  `http://127.0.0.1:80`,
  `http://localhost:80`,
  frontendUrl,
];

/**@param {string} origin */
export function isNotWhiteListed(origin) {
  console.group();
  console.log(origin);
  console.log(whitelist);
  console.log(whitelist.indexOf(origin));
  console.groupEnd();

  return whitelist.indexOf(origin) === -1;
}
