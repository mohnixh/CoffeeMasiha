import { readFile, writeFile } from 'node:fs/promises';
import { URL } from 'node:url';
import { renderPage } from '../.render/entry-server.js';

const path = new URL('../dist/index.html', import.meta.url);
const html = await readFile(path, 'utf8');
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error('Could not find the app root in built HTML');
await writeFile(path, html.replace(marker, `<div id="root">${renderPage()}</div>`));
