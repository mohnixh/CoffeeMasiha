# Anonymous guestbook

The guestbook uses the existing GitHub repository for durable shared storage. No database, visitor accounts, names, or email fields are required. Each note becomes an issue created by the server's GitHub account. Notes appear as “A fellow coffee dreamer” on the website.

## Activation

The UI and API are implemented, but posting stays disabled until the server is configured. An unconfigured deployment returns HTTP 503; the site never pretends a browser-local note is shared with other visitors.

1. Ensure Issues are enabled on `mohnixh/CoffeeMasiha`. Create the labels `guestbook` and `guestbook-approved` in the repository's Issues → Labels screen.
2. As `mohnixh`, create a fine-grained GitHub personal access token scoped **only** to `mohnixh/CoffeeMasiha`, with **Issues: Read and write**. Keep it out of chat and source control. A dedicated token avoids giving the website access to unrelated repositories or repository code.
3. In the existing Vercel project's Settings → Environment Variables, set `GUESTBOOK_GITHUB_TOKEN` to that token. The repository and author default to `mohnixh/CoffeeMasiha` and `mohnixh`; override with the matching variables from `.env.example` if needed. Do not expose any token with a `VITE_` prefix. Redeploy after setting the server environment.
4. Optionally set `GUESTBOOK_ORIGIN` to the canonical production origin. Leave it unset for previews, which validate against their own request origin. The front end always uses the same-origin `/api/guestbook` endpoint, so the existing content security policy needs no external host allowance.
5. Verify one intended public note, approve it, and confirm it appears from a different browser. Test submissions have not been posted to the real repository automatically.

For local development, copy `.env.example` to ignored `.env.local`, enter the restricted token locally, then run `npm run dev`. `npm run preview` also serves the API through Vite's local middleware. Both use the same handler as the deployed Vercel function.

## Review and moderation

- New issues have only the `guestbook` label and do not appear on the site's wall.
- Approve a note by adding `guestbook-approved` to its issue.
- Remove that label or close the issue to hide the note from the site. Visitors can use “Refresh notes” to see changes.
- The site accepts only its own structured note format from the configured GitHub account; ordinary repository discussions and pull requests are not shown.
- Notes are stored as JSON in the issue body. To correct a note, edit the `message` value while keeping valid JSON and the marker. Closing an issue is preferable when rejecting content.
- If a token expires, renew or replace it in Vercel and redeploy. A credential or GitHub outage produces an unavailable state; it does not erase the visitor's draft.

**Repository visibility matters:** on a public repository, submitted notes are publicly accessible on GitHub even before website approval. The form says this before submission. Website approval controls the website wall, not GitHub visibility. The author shown on GitHub is the server's account, not the visitor; issue text explains that it was submitted anonymously.

## What is stored

The issue contains a random submission ID in its title, the message, moderation labels, and GitHub timestamps. The application does not save a visitor name, email, account, raw IP address, or browser fingerprint in GitHub. A short-lived HMAC of the request IP is held in function memory for throttling and is never returned to the browser. Hosting infrastructure may maintain its normal request logs. The form asks visitors not to include identifying details in their own message.

## Abuse controls and limits

- Server-validated length of 3–500 Unicode code points, 4 KB request-body limit, plain-text rendering, and rejection of email addresses, URLs, and unexpected identity fields.
- Honeypot field, same-origin POST checks, expiring signed form tokens, and a brief minimum form dwell time.
- One submission per minute per network address **within a running function instance**; a recent shared-issue check limits the guestbook to about 20 new notes per hour. GitHub's API limits also apply.
- Retry IDs prevent common duplicate submissions. GitHub Issues does not provide an atomic unique-key or rate-limit operation: the minute limit resets on cold starts and simultaneous requests across function instances can race. This is a modest, reviewed guestbook, not a high-volume comment service. Use host-level rate limiting or migrate to a transactional store if traffic warrants it.
- Only approved, open notes are returned to readers, 12 at a time. Secrets and GitHub account metadata never enter the public API response.

## Verification

`npm test` exercises the real API handler against a simulated GitHub API, including two independent readers, approval/hiding, privacy boundaries, pagination, invalid input, duplicate retries, rate limits, and service failure. This does not claim a live GitHub/Vercel connection has been verified. `npm run build` checks TypeScript and prerenders the page; `npm run lint` checks source style.

References: [GitHub issue API](https://docs.github.com/en/rest/issues/issues), [Vercel Node.js functions](https://vercel.com/docs/functions/runtimes/node-js).
