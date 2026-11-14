import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { Buffer } from 'node:buffer';

const { Response, URL, AbortSignal } = globalThis;
const MARKER = '<!-- coffeemasiha-guestbook:v1 -->';
const NOTE_LABEL = 'guestbook';
const APPROVED_LABEL = 'guestbook-approved';
const PAGE_SIZE = 12;
const MAX_BODY = 4096;
const HOUR = 60 * 60 * 1000;

class PublicError extends Error {
  constructor(status, message, retryAfter) {
    super(message);
    this.status = status;
    this.retryAfter = retryAfter;
  }
}

function json(status, data, headers = {}) {
  return Response.json(data, { status, headers: { 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff', ...headers } });
}

function parseNote(issue, author) {
  if (issue.pull_request || issue.user?.login?.toLowerCase() !== author.toLowerCase()) return null;
  const body = issue.body || '';
  const encoded = body.split(`${MARKER}\n\n\`\`\`json\n`)[1]?.split('\n```')[0];
  if (!encoded) return null;
  try {
    const note = JSON.parse(encoded);
    if (typeof note.message !== 'string' || Array.from(note.message).length > 500 || !Number.isSafeInteger(issue.id) || !Number.isFinite(Date.parse(issue.created_at))) return null;
    return { id: issue.id, message: note.message, createdAt: issue.created_at };
  } catch { return null; }
}

export function createGuestbookHandler({ token, repository = 'mohnixh/CoffeeMasiha', author = repository.split('/')[0], origin }, { fetch = globalThis.fetch, now = Date.now } = {}) {
  let labelsCheckedUntil = 0;
  const cooldowns = new Map(); // Short-lived hashes only; never written to GitHub.
  const inFlight = new Set();
  const configured = Boolean(token && /^[\w.-]+\/[\w.-]+$/.test(repository));
  const digest = value => createHmac('sha256', token).update(value).digest('base64url');
  const formToken = () => {
    const payload = `${now()}.${randomUUID()}`;
    return `${payload}.${digest(payload)}`;
  };

  function checkFormToken(value) {
    if (typeof value !== 'string' || value.length > 200) throw new PublicError(400, 'Please refresh the notes and try again.');
    const parts = value.split('.');
    const payload = parts.slice(0, 2).join('.');
    const expected = Buffer.from(digest(payload));
    const supplied = Buffer.from(parts[2] || '');
    if (parts.length !== 3 || expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) throw new PublicError(400, 'Please refresh the notes and try again.');
    const age = now() - Number(parts[0]);
    if (!Number.isFinite(age) || age < 2000) throw new PublicError(429, 'Take a small pause, then leave your note.', 2);
    if (age > HOUR / 2) throw new PublicError(400, 'Your writing session has expired. Refresh the notes below, then try again. Your words are still here.');
  }

  async function github(path, options = {}) {
    const response = await fetch(`https://api.github.com/repos/${repository}${path}`, {
      ...options,
      headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}`, 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'CoffeeMasiha-Guestbook', 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      if (response.status === 429 || response.headers.get('x-ratelimit-remaining') === '0') throw new PublicError(503, 'The guestbook is busy. Please try again a little later.', 60);
      throw new PublicError(503, 'The guestbook is taking a little pause. Please try again later.');
    }
    return { data: await response.json(), hasMore: /rel="next"/.test(response.headers.get('link') || '') };
  }

  async function checkLabels() {
    if (labelsCheckedUntil > now()) return;
    await Promise.all([NOTE_LABEL, APPROVED_LABEL].map(label => github(`/labels/${label}`)));
    labelsCheckedUntil = now() + 5 * 60 * 1000;
  }

  async function readBody(request) {
    if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) throw new PublicError(415, 'Please send your note using the form.');
    if (Number(request.headers.get('content-length')) > MAX_BODY) throw new PublicError(413, 'That note is too long. Please keep it within 500 characters.');
    const reader = request.body?.getReader();
    if (!reader) throw new PublicError(400, 'Please write a note first.');
    const chunks = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY) { await reader.cancel(); throw new PublicError(413, 'That note is too long. Please keep it within 500 characters.'); }
      chunks.push(Buffer.from(value));
    }
    try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
    catch { throw new PublicError(400, 'We could not read your note. Please try again.'); }
  }

  return async request => {
    try {
      if (!['GET', 'POST'].includes(request.method)) return json(405, { error: 'Method not allowed.' }, { Allow: 'GET, POST' });
      if (!configured) return json(503, { error: 'The guestbook is not connected yet. Please come back a little later.' });
      const url = new URL(request.url);
      if (request.method === 'GET') {
        const page = Number(url.searchParams.get('page') || 1);
        if (!Number.isInteger(page) || page < 1 || page > 1000) throw new PublicError(400, 'That page of notes does not exist.');
        await checkLabels();
        const result = await github(`/issues?state=open&labels=${NOTE_LABEL},${APPROVED_LABEL}&sort=created&direction=desc&per_page=${PAGE_SIZE}&page=${page}`);
        if (!Array.isArray(result.data)) throw new Error('Invalid upstream response');
        const notes = result.data.filter(issue => issue.state === 'open' && [NOTE_LABEL, APPROVED_LABEL].every(label => issue.labels?.some(item => item.name === label))).map(issue => parseNote(issue, author)).filter(Boolean);
        return json(200, { notes, hasMore: result.hasMore, formToken: formToken() });
      }

      const expectedOrigin = origin ? new URL(origin).origin : url.origin;
      if (request.headers.get('origin') !== expectedOrigin || request.headers.get('sec-fetch-site') === 'cross-site') throw new PublicError(403, 'Please leave your note from the CoffeeMasiha website.');
      const body = await readBody(request);
      if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).some(key => !['message', 'website', 'formToken', 'submissionId'].includes(key))) throw new PublicError(400, 'Please send only your note. No personal details are needed.');
      if (typeof body.website !== 'string' || body.website.length !== 0) throw new PublicError(400, 'We could not accept this note. Please try again.');
      if (typeof body.message !== 'string') throw new PublicError(400, 'Please write a note first.');
      const message = body.message.trim();
      if (Array.from(message).length < 3 || Array.from(message).length > 500) throw new PublicError(400, 'A note can be between 3 and 500 characters.');
      if (Array.from(message).some(char => { const code = char.codePointAt(0); return (code < 32 && ![9, 10, 13].includes(code)) || code === 127; })) throw new PublicError(400, 'Please use plain text for your note.');
      if (/https?:\/\/|www\.|[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(message)) throw new PublicError(400, 'Please leave out links and email addresses. A few words are all we need.');
      if (typeof body.submissionId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.submissionId)) throw new PublicError(400, 'Please refresh the notes and try again.');
      checkFormToken(body.formToken);
      const ip = request.headers.get('x-vercel-forwarded-for') || request.headers.get('x-forwarded-for') || 'unknown';
      const fingerprint = digest(ip.split(',')[0].trim());
      for (const [key, expires] of cooldowns) if (expires <= now()) cooldowns.delete(key);
      if (inFlight.has(fingerprint)) throw new PublicError(429, 'Your note is being received. Please wait a moment.', 10);
      if ((cooldowns.get(fingerprint) || 0) > now()) throw new PublicError(429, 'Let your last note settle. Please try again in a minute.', 60);
      // Bound memory even if many different addresses arrive at one instance.
      if (cooldowns.size >= 2000) throw new PublicError(503, 'The guestbook is busy. Please try again shortly.', 60);
      inFlight.add(fingerprint);
      try {
        await checkLabels();
        const since = new Date(now() - HOUR).toISOString();
        const recent = await github(`/issues?state=all&labels=${NOTE_LABEL}&sort=created&direction=desc&per_page=100&since=${encodeURIComponent(since)}`);
        if (!Array.isArray(recent.data)) throw new Error('Invalid upstream response');
        const title = `Guestbook note ${body.submissionId}`;
        const duplicate = recent.data.find(issue => issue.title === title && parseNote(issue, author));
        if (duplicate) return json(200, { accepted: true, formToken: formToken() });
        const count = recent.data.filter(issue => !issue.pull_request && Date.parse(issue.created_at) >= now() - HOUR).length;
        if (count >= 20) throw new PublicError(429, 'The table has received plenty of notes this hour. Please try again a little later.', 3600);
        // Keep visitor text inside JSON; escaped punctuation cannot ping GitHub users
        // or break out of the fenced block. No identity or network data is stored.
        const encoded = JSON.stringify({ message }).replace(/[@<>`]/g, char => `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`);
        const result = await github('/issues', { method: 'POST', body: JSON.stringify({ title, labels: [NOTE_LABEL], body: `An anonymous visitor submitted this note through CoffeeMasiha. It was not written by the repository owner.\n\nAdd the \`${APPROVED_LABEL}\` label to show it on the website. Close this issue to hide it.\n\n${MARKER}\n\n\`\`\`json\n${encoded}\n\`\`\`` }) });
        if (!parseNote(result.data, author)) throw new Error('Could not confirm stored note');
        cooldowns.set(fingerprint, now() + 60000);
        return json(201, { accepted: true, formToken: formToken() });
      } finally { inFlight.delete(fingerprint); }
    } catch (error) {
      if (error instanceof PublicError) return json(error.status, { error: error.message }, error.retryAfter ? { 'Retry-After': String(error.retryAfter) } : {});
      return json(503, { error: 'We could not confirm your note was received. Please try again shortly.' });
    }
  };
}
