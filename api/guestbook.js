import process from 'node:process';
import { createGuestbookHandler } from '../server/guestbook.js';

export default {
  fetch: createGuestbookHandler({
    token: process.env.GUESTBOOK_GITHUB_TOKEN,
    repository: process.env.GUESTBOOK_GITHUB_REPOSITORY || 'mohnixh/CoffeeMasiha',
    author: process.env.GUESTBOOK_GITHUB_AUTHOR,
    origin: process.env.GUESTBOOK_ORIGIN,
  }),
};
