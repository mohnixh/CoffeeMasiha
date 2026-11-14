import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from "vite";
import { Readable } from "node:stream";
import { createGuestbookHandler } from "./server/guestbook.js";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Use the same API in local development and production preview. Credentials
// remain in this server process; only VITE_ variables enter the browser bundle.
function guestbookApi(env: Record<string, string>): Plugin {
  const handle = createGuestbookHandler({ token: env.GUESTBOOK_GITHUB_TOKEN, repository: env.GUESTBOOK_GITHUB_REPOSITORY || 'mohnixh/CoffeeMasiha', author: env.GUESTBOOK_GITHUB_AUTHOR, origin: env.GUESTBOOK_ORIGIN });
  const attach = (server: Pick<ViteDevServer, 'middlewares'>) => {
    server.middlewares.use(async (req, res, next) => {
      if (new URL(req.url || '/', 'http://localhost').pathname !== '/api/guestbook') return next();
      try {
        const headers = new Headers();
        for (const [key, value] of Object.entries(req.headers)) if (value) headers.set(key, Array.isArray(value) ? value.join(', ') : value);
        headers.set('x-forwarded-for', req.socket.remoteAddress || 'local');
        const init = { method: req.method, headers, ...(req.method === 'POST' ? { body: Readable.toWeb(req) as ReadableStream<Uint8Array>, duplex: 'half' } : {}) };
        const response = await handle(new Request(`http://${req.headers.host}${req.url}`, init));
        res.statusCode = response.status;
        response.headers.forEach((value, key) => res.setHeader(key, value));
        res.end(await response.text());
      } catch {
        res.statusCode = 503;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'The guestbook is taking a little pause. Please try again later.' }));
      }
    });
  };
  return { name: 'guestbook-api', configureServer: attach, configurePreviewServer: attach };
}

export default defineConfig(({ mode }) => ({
  build: {
    chunkSizeWarningLimit: 800,
  },
  plugins: [react(), tailwindcss(), guestbookApi(loadEnv(mode, process.cwd(), 'GUESTBOOK_'))],
}));
