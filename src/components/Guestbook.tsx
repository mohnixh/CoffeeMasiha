import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';

type Note = { id: number; message: string; createdAt: string };
type NotesPage = { notes: Note[]; hasMore: boolean; formToken: string };
const LIMIT = 500;

async function readResponse(response: Response) {
  if (!response.headers.get('content-type')?.includes('application/json')) {
    throw new Error('The guestbook is not connected yet. Please come back a little later.');
  }
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'The guestbook is taking a little pause. Please try again.');
  return result;
}

export function Guestbook() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [connected, setConnected] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [notice, setNotice] = useState('');
  const token = useRef('');
  const submissionId = useRef('');
  const busy = useRef(false);
  const request = useRef<AbortController | null>(null);
  const mounted = useRef(false);
  const length = Array.from(message).length;

  const load = useCallback(async (nextPage = 1) => {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setLoading(true);
    setLoadError('');
    try {
      const response = await fetch(`/api/guestbook?page=${nextPage}`, { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(15000)]) });
      const result: NotesPage = await readResponse(response);
      if (controller.signal.aborted) return;
      token.current = result.formToken;
      setNotes(current => nextPage === 1 ? result.notes : [...current, ...result.notes.filter(note => !current.some(old => old.id === note.id))]);
      setPage(nextPage);
      setHasMore(result.hasMore);
      setConnected(true);
    } catch (error) {
      if (controller.signal.aborted) return;
      setLoadError(error instanceof Error ? error.message : 'Could not load the notes. Please try again.');
      if (nextPage === 1) setConnected(false);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    void load();
    return () => { mounted.current = false; request.current?.abort(); };
  }, [load]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || !connected) return;
    setSubmitError('');
    setNotice('');
    const trimmed = message.trim();
    if (Array.from(trimmed).length < 3 || Array.from(trimmed).length > LIMIT) {
      setSubmitError('A note can be between 3 and 500 characters.');
      return;
    }
    busy.current = true;
    setSending(true);
    submissionId.current ||= crypto.randomUUID();
    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, website, formToken: token.current, submissionId: submissionId.current }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await readResponse(response);
      if (!mounted.current) return;
      setMessage('');
      submissionId.current = '';
      token.current = result.formToken;
      setNotice('Thank you for leaving a little of yourself here. Your anonymous note will appear after review.');
    } catch (error) {
      if (mounted.current) setSubmitError(error instanceof Error && error.name !== 'TimeoutError' ? error.message : 'We could not confirm your note was received. Your words are still here; please try again.');
    } finally {
      busy.current = false;
      if (mounted.current) setSending(false);
    }
  }

  return <section className="guestbook section-shell" id="guestbook" aria-labelledby="guestbook-title">
    <div className="section-kicker guestbook-kicker"><span className="eyebrow">05 / Notes over coffee</span><span className="small-note">A thought can stay, even after the cup is empty.</span></div>
    <div className="guestbook-layout">
      <div className="guestbook-intro">
        <span className="guestbook-mark bean-mark" aria-hidden="true" />
        <h2 id="guestbook-title">Leave a little<br /><em>of your day.</em></h2>
        <p>A favourite cup. A small thought. Something this dream made you feel. There’s a little space for it here.</p>
        <div className="guestbook-anonymous"><span aria-hidden="true">—</span><p>Every note is anonymous.<br />No name, email, or sign-in.</p></div>
        <a className="guestbook-private" href="mailto:mohdmohnish01@gmail.com">Prefer a private conversation? Write to Mohnish <span className="ui-arrow ui-arrow-up-right" aria-hidden="true" /></a>
      </div>
      <div className="guestbook-paper">
        <form onSubmit={submit} aria-label="Leave an anonymous note" aria-busy={sending}>
          <label className="eyebrow" htmlFor="guestbook-message">A note for the table</label>
          <textarea id="guestbook-message" name="message" rows={5} maxLength={1000} value={message} readOnly={sending} placeholder="Today, my cup feels like…" aria-describedby="guestbook-help guestbook-count" aria-invalid={length > LIMIT || undefined} onChange={event => { setMessage(event.target.value); submissionId.current = ''; setNotice(''); setSubmitError(''); }} />
          <div className="guestbook-form-meta"><span>Signed, anonymous</span><span id="guestbook-count" className={length > LIMIT ? 'guestbook-over-limit' : ''}>{length} / {LIMIT}</span></div>
          <div className="guestbook-trap" aria-hidden="true"><label htmlFor="guestbook-website">Leave this field empty</label><input id="guestbook-website" name="website" autoComplete="off" tabIndex={-1} value={website} onChange={event => setWebsite(event.target.value)} /></div>
          <p id="guestbook-help" className="guestbook-help">Notes are public submissions, stored on GitHub and shown here after review. Keep it kind; leave out names, contact details, and links.</p>
          <div className="guestbook-form-actions"><button className="guestbook-submit" type="submit" disabled={!connected || sending || length > LIMIT || message.trim().length < 3}>{sending ? 'Leaving your note…' : 'Leave an anonymous note'}<span className="ui-arrow ui-arrow-up-right" aria-hidden="true" /></button><span className="guestbook-review-note">A little care before every note goes up.</span></div>
          {!connected && <p className="guestbook-help">{loading ? 'Checking whether the table is open…' : 'Posting is paused until the guestbook is connected.'}</p>}
          {submitError && <p className="guestbook-error" role="alert">{submitError}</p>}
          {notice && <p className="guestbook-success" role="status">{notice}</p>}
        </form>
      </div>
    </div>
    <div className="guestbook-wall-heading"><div><p className="eyebrow">From one visitor to another</p><h3>A few words <em>left behind.</em></h3></div><button type="button" className="guestbook-text-button" disabled={loading} onClick={() => void load()}>{loading ? 'Reading the notes…' : 'Refresh notes'}</button></div>
    {loadError && <div className="guestbook-unavailable" role="status"><p>{loadError}</p><button className="guestbook-text-button" type="button" disabled={loading} onClick={() => void load()}>Try again</button></div>}
    {!loadError && !loading && notes.length === 0 && <div className="guestbook-empty"><span className="guestbook-quote" aria-hidden="true">“</span><p>The table is quiet, for now.</p><span>Your note could be the first one here.</span></div>}
    <div className="guestbook-notes" aria-busy={loading}>{notes.map(note => <article className="guestbook-note" key={note.id}><span className="guestbook-quote" aria-hidden="true">“</span><p>{note.message}</p><footer><span>A fellow coffee dreamer</span><time dateTime={note.createdAt}>{new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(note.createdAt))}</time></footer></article>)}</div>
    {hasMore && !loadError && <button className="guestbook-more" type="button" disabled={loading} onClick={() => void load(page + 1)}>{loading ? 'Reading…' : 'Read a few more notes'}</button>}
  </section>;
}
