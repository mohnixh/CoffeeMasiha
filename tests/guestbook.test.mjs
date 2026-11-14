import test from 'node:test';
import assert from 'node:assert/strict';
import { createGuestbookHandler } from '../server/guestbook.js';

const { Request, Response, URL } = globalThis;
const SITE = 'https://www.coffeemasiha.com';
const ID = '1b4b69a8-1d60-4de9-8c86-7bb0a19f82f1';
const ID2 = '2b4b69a8-1d60-4de9-8c86-7bb0a19f82f1';

function setup() {
  let time = Date.parse('2026-11-14T12:00:00Z');
  const issues = [];
  const writes = [];
  let failure = false;
  let missingLabels = false;
  const fetch = async (input, init) => {
    const url = new URL(input);
    if (failure) return Response.json({ message: 'Sensitive upstream error: secret-token' }, { status: 500 });
    if (url.pathname.includes('/labels/')) return Response.json({}, { status: missingLabels ? 404 : 200 });
    if (init.method === 'POST') {
      const body = JSON.parse(init.body);
      writes.push(body);
      const issue = { ...body, id: issues.length + 1, state: 'open', created_at: new Date(time).toISOString(), user: { login: 'mohnixh' }, labels: body.labels.map(name => ({ name })) };
      issues.unshift(issue);
      return Response.json(issue, { status: 201 });
    }
    const labels = url.searchParams.get('labels').split(',');
    const state = url.searchParams.get('state');
    const filtered = issues.filter(issue => (state === 'all' || issue.state === state) && labels.every(label => issue.labels.some(item => item.name === label)));
    const count = Number(url.searchParams.get('per_page'));
    const page = Number(url.searchParams.get('page') || 1);
    return Response.json(filtered.slice((page - 1) * count, page * count), { headers: filtered.length > page * count ? { Link: '<https://api.github.com/next>; rel="next"' } : {} });
  };
  const makeHandler = () => createGuestbookHandler({ token: 'secret-token', repository: 'mohnixh/CoffeeMasiha' }, { fetch, now: () => time });
  const handler = makeHandler();
  const get = (handle = handler, page = 1) => handle(new Request(`${SITE}/api/guestbook?page=${page}`));
  const post = (body, handle = handler, headers = {}) => handle(new Request(`${SITE}/api/guestbook`, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: SITE, 'x-vercel-forwarded-for': '192.0.2.10', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) }));
  const payload = async () => {
    const { formToken } = await (await get()).json();
    time += 2500;
    return { message: 'A quiet cup made my day.', website: '', formToken, submissionId: ID };
  };
  return { handler, makeHandler, get, post, payload, issues, writes, advance: ms => { time += ms; }, fail: () => { failure = true; }, missing: () => { missingLabels = true; } };
}

test('an unconfigured deployment returns unavailable, never a false success', async () => {
  const handler = createGuestbookHandler({});
  for (const method of ['GET', 'POST']) {
    const response = await handler(new Request(`${SITE}/api/guestbook`, { method }));
    assert.equal(response.status, 503);
    assert.match((await response.json()).error, /not connected/);
  }
});

test('a note persists through the storage API and is shared only after approval', async () => {
  const app = setup();
  const response = await app.post(await app.payload());
  assert.equal(response.status, 201);
  assert.equal((await response.json()).accepted, true);
  assert.deepEqual(app.writes[0].labels, ['guestbook']);
  const otherVisitor = app.makeHandler();
  assert.deepEqual((await (await app.get(otherVisitor)).json()).notes, []);
  app.issues[0].labels.push({ name: 'guestbook-approved' });
  const publicResponse = await app.get(otherVisitor);
  const { notes } = await publicResponse.json();
  assert.deepEqual(Object.keys(notes[0]).sort(), ['createdAt', 'id', 'message']);
  assert.equal(notes[0].message, 'A quiet cup made my day.');
  assert.equal(publicResponse.headers.get('cache-control'), 'private, no-store');
  app.issues[0].state = 'closed';
  assert.deepEqual((await (await app.get(otherVisitor)).json()).notes, []);
});

test('the store receives only the message, not visitor identity or IP', async () => {
  const app = setup();
  const body = await app.payload();
  body.message = 'Hello @someone, <script>test</script> and ``` stay plain text.';
  assert.equal((await app.post(body)).status, 201);
  const stored = app.writes[0].body;
  assert.ok(!stored.includes('192.0.2.10'));
  assert.ok(!stored.includes('@someone'));
  assert.ok(!stored.includes('<script>'));
  assert.ok(!stored.includes(body.formToken));
  app.issues[0].labels.push({ name: 'guestbook-approved' });
  assert.equal((await (await app.get()).json()).notes[0].message, body.message);
});

test('cross-site posting and forged form tokens cannot write notes', async () => {
  const app = setup();
  const payload = await app.payload();
  assert.equal((await app.post(payload, app.handler, { Origin: 'https://other.example' })).status, 403);
  assert.equal((await app.post({ ...payload, formToken: `${payload.formToken}changed` })).status, 400);
  assert.equal(app.writes.length, 0);
});

test('expired forms preserve the note by rejecting submission clearly', async () => {
  const app = setup();
  const payload = await app.payload();
  app.advance(31 * 60 * 1000);
  const response = await app.post(payload);
  assert.equal(response.status, 400);
  assert.match((await response.json()).error, /expired/);
  assert.equal(app.writes.length, 0);
});

test('blank, oversized, malformed, identifying and spam inputs are rejected', async () => {
  const app = setup();
  const body = await app.payload();
  const bad = [
    { ...body, message: '  ' }, { ...body, message: 'x'.repeat(501) },
    { ...body, message: 'Email me at someone@example.com' }, { ...body, message: 'Visit https://example.com' },
    { ...body, website: 'bot' }, { ...body, email: 'private@example.com' },
    { ...body, message: 'bad\u0000text' }, { ...body, submissionId: 'not-a-uuid' },
    'not json', 'x'.repeat(4097),
  ];
  for (const payload of bad) assert.ok([400, 413].includes((await app.post(payload)).status));
  assert.equal((await app.post(body, app.handler, { 'Content-Type': 'text/plain' })).status, 415);
  assert.equal(app.writes.length, 0);
});

test('Unicode length counts characters rather than UTF-16 units', async () => {
  const app = setup();
  const body = await app.payload();
  assert.equal((await app.post({ ...body, message: '☕'.repeat(500) })).status, 201);
});

test('repeat submissions are throttled and retries do not duplicate a stored note', async () => {
  const app = setup();
  const body = await app.payload();
  assert.equal((await app.post(body)).status, 201);
  const limited = await app.post({ ...body, submissionId: ID2 });
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get('retry-after'), '60');
  // A different function instance also recognises the retry in the shared store.
  assert.equal((await app.post(body, app.makeHandler())).status, 200);
  assert.equal(app.writes.length, 1);
});

test('public pagination neither skips nor duplicates entries', async () => {
  const app = setup();
  await app.post(await app.payload());
  const original = app.issues[0];
  original.labels.push({ name: 'guestbook-approved' });
  for (let id = 2; id <= 13; id++) app.issues.push({ ...original, id });
  const first = await (await app.get(app.handler, 1)).json();
  const second = await (await app.get(app.handler, 2)).json();
  assert.equal(first.hasMore, true);
  assert.equal(second.hasMore, false);
  assert.equal(new Set([...first.notes, ...second.notes].map(note => note.id)).size, 13);
});

test('ordinary issues, pull requests and notes from another author stay off the wall', async () => {
  const app = setup();
  await app.post(await app.payload());
  app.issues[0].labels.push({ name: 'guestbook-approved' });
  const original = app.issues[0];
  app.issues.push({ ...original, id: 2, user: { login: 'stranger' } }, { ...original, id: 3, pull_request: {} }, { ...original, id: 4, body: 'An ordinary issue.' });
  assert.equal((await (await app.get()).json()).notes.length, 1);
});

test('upstream failures and missing moderation labels fail closed without exposing secrets', async () => {
  for (const mode of ['fail', 'missing']) {
    const app = setup();
    app[mode]();
    const response = await app.get();
    assert.equal(response.status, 503);
    assert.ok(!(await response.text()).includes('secret-token'));
  }
});

test('the shared store imposes a global hourly cap even on a fresh function instance', async () => {
  const app = setup();
  const body = await app.payload();
  await app.post(body);
  for (let id = 2; id <= 20; id++) app.issues.push({ ...app.issues[0], id, title: `Other note ${id}` });
  assert.equal((await app.post({ ...body, submissionId: ID2 }, app.makeHandler())).status, 429);
  assert.equal(app.writes.length, 1);
});
