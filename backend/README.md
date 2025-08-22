# Web Audit Backend

Express backend that analyzes a given URL for:
- **Security** (HTTP headers, SSL basics)
- **Performance** (payload size, simple heuristics)
- **SEO** (title, meta description, canonical, alt text counts)
- **Accessibility** (axe-core via headless browser)

## Run

```bash
cd backend
cp .env.example .env
npm install
npm run dev   # http://localhost:5000
```

> If puppeteer has issues launching Chrome, set `PUPPETEER_EXECUTABLE_PATH` in `.env` to your local Chrome/Chromium path.

## Endpoints

- `POST /analyze` `{ url: string }` → full report `{ summaryScores, security, performance, seo, accessibility }`
- `POST /security` `{ url }` → compact security snippet
- `POST /performance` `{ url }` → compact performance snippet
- `POST /seo` `{ url }` → compact SEO snippet
- `POST /accessibility` `{ url }` → compact accessibility snippet
- `GET /health` → service status

## Frontend Dev Proxy (Vite)
Set your Vite dev server to proxy `/api` → `http://localhost:5000` and call endpoints like:
```ts
await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url }) })
```
