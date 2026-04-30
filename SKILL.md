---
name: pickle-master-dev
description: Use this skill to rapidly build features, fix bugs, and maintain the Pickle Master pickleball club website. Covers the full stack: CDN-Babel React frontend, Vercel serverless API, and Supabase Postgres backend. Invoke when the user asks to add a page, fix a bug, build an API endpoint, or change site content.
user-invocable: true
---

# Pickle Master — Developer Skill

You are a full-stack engineer on the Pickle Master website. Read this file fully before touching any code.

---

## Stack at a Glance

| Layer | Tech | Notes |
|---|---|---|
| Frontend | React 18 via CDN Babel | No build step — JSX is compiled in the browser |
| Routing | Custom `page` state in App | Single-page app, no react-router |
| Styling | 100% inline styles | No CSS files, no Tailwind |
| Backend | Vercel serverless (Node.js) | `api/**/*.js` — each file = one route |
| Database | Supabase Postgres | Service-role key used server-side |
| Auth | Supabase Auth + JWT | Token stored in `localStorage` via `pm_light_state` |
| Payments | Stripe | Subscriptions + one-off payments |
| Email | Resend | Contact form + transactional |
| i18n | `lang.js` | EN/ZH, accessed via `window.LANG[lang]` |
| Deploy | GitHub → Vercel auto-deploy | Push to `master` → live in ~60s |

---

## File Map

```
website/
  index-light.html      ← App entry point. Loads all JSX scripts. Contains window.API and App component.
  shared-light.jsx      ← Nav, Footer, CartSidebar. Also defines window.PM_CONTENT + window.fetchSiteContent().
  lang.js               ← All EN/ZH strings. Access via window.LANG[lang].key
  HomePage-light.jsx    ← Home page (hero, testimonials, rules, lessons)
  MemberPage-light.jsx  ← Membership tiers (DINK / FLEX / Guest)
  BookPage.jsx          ← Court booking calendar
  OtherPages-light.jsx  ← Social, Private, Contact, Login, Account pages
  MorePages-light.jsx   ← Coaches, Tournament, Shop, FAQ pages
  AdminPage-light.jsx   ← Admin dashboard (Content, Products, Pricing, Courts, Tournaments, Bookings, Users)

api/
  _lib/
    supabase.js         ← Singleton service-role Supabase client (DO NOT call auth.signInWithPassword on it)
    auth.js             ← getUser(), requireAdmin(), json(), parseBody(), cors()
  auth/
    login.js            ← POST /api/auth/login
    register.js         ← POST /api/auth/register
    me.js               ← GET  /api/auth/me
    logout.js           ← POST /api/auth/logout
  admin/
    content.js          ← GET/POST /api/admin/content (site_content table)
    products.js         ← CRUD /api/admin/products
    courts.js           ← CRUD /api/admin/courts
    tournaments.js      ← CRUD /api/admin/tournaments
    session-types.js    ← CRUD /api/admin/session-types
    bookings.js         ← GET  /api/admin/bookings
    users.js            ← GET/POST /api/admin/users
  content.js            ← GET /api/content (public — coaches, faqs, testimonials, contact_info, opening_hours)
  contact.js            ← POST /api/contact
  courts.js             ← GET /api/courts
  bookings/             ← availability, mine, cancel
  checkout/             ← create-intent, confirm
  membership/           ← subscribe, cancel
  tournaments/          ← list, register
  shop/                 ← products list
  webhooks/stripe.js    ← Stripe webhook handler

supabase/migrations/    ← Run manually in Supabase SQL Editor (not auto-applied)
```

---

## Key Patterns

### Adding a new frontend page

1. Add the component to the appropriate JSX file (or create a new one)
2. Export it: `Object.assign(window, { MyPage })`
3. Add a `<script type="text/babel" src="MyPage-light.jsx"></script>` tag in `index-light.html`
4. Add the route in `index-light.html`: `{page === 'mypage' && <window.MyPage {...sharedProps} />}`
5. Add a nav link in `shared-light.jsx` Nav component if needed

### Adding a new API endpoint

```js
// api/my-endpoint.js
const supabase = require('./_lib/supabase.js');
const { json, cors, parseBody, requireAdmin } = require('./_lib/auth.js');

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  // For admin-only routes:
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('table').select('*');
    if (error) return json(res, 500, { error: error.message });
    return json(res, 200, { items: data });
  }

  if (req.method === 'POST') {
    const body = await parseBody(req);
    // ...
  }
};
```

### Calling the API from the frontend

```js
// GET
const data = await window.API.get('/api/my-endpoint');

// POST
const result = await window.API.post('/api/my-endpoint', { key: 'value' });
```

`window.API` automatically adds the `Authorization: Bearer <token>` header when the user is logged in.

### Adding dynamic site content

Content is stored in Supabase `site_content` table (key/JSONB value pairs).

- **Admin edits** via the "Content" tab in the admin panel → `POST /api/admin/content`
- **Frontend reads** via `window.fetchSiteContent()` → `GET /api/content`
- Current keys: `coaches`, `faqs`, `testimonials`, `contact_info`, `opening_hours`

To add a new content type:
1. Insert a seed row in Supabase: `INSERT INTO site_content (key, value) VALUES ('my_key', '...'::jsonb)`
2. Add an editor section to `ContentTab` in `AdminPage-light.jsx`
3. Fetch it in the frontend component with `window.fetchSiteContent().then(d => d.my_key)`

### Bilingual content (EN/ZH)

```js
const t = window.LANG[lang]; // Access translation strings
// e.g. t.nav_home, t.coaches_title

// For dynamic DB content, store both languages as separate fields:
{ title_en: '...', title_zh: '...' }
// Render: lang === 'EN' ? item.title_en : item.title_zh
```

---

## Design System (inline styles)

```js
// Colours
'#0F3D24'  // Forest green (primary)
'#C9A84C'  // Gold (accent)
'#FDFAF5'  // Cream (page background)
'#F0EAE0'  // Warm beige (card/footer background)
'#1A1208'  // Near-black (body text)
'#7A6A4A'  // Muted brown (secondary text)
'#E8DFD0'  // Border colour

// Fonts (loaded via Google Fonts in index-light.html)
fontFamily: "'Playfair Display SC', serif"  // Headings / brand
fontFamily: "'DM Sans', sans-serif"         // Body / UI
fontFamily: "'Oswald', sans-serif"          // Labels / uppercase tags

// Common patterns
borderRadius: 12          // Cards
borderRadius: 999         // Pills / buttons
boxShadow: '0 2px 12px rgba(26,18,8,0.07)'  // Subtle card shadow
```

---

## Critical Gotchas

### 1. Never call `supabase.auth.signInWithPassword()` on the shared service-role client

The shared `supabase` singleton in `_lib/supabase.js` uses the service role key for all DB queries (bypasses RLS). Calling any `supabase.auth.signIn*` method on it replaces its internal auth token with the user's JWT — all subsequent DB queries in that function instance then run as the user with RLS, silently returning null rows.

**Fix**: Call the Supabase Auth REST API directly for sign-in:
```js
const authRes = await fetch(`${process.env.SUPABASE_URL}/auth/v1/token?grant_type=password`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY },
  body: JSON.stringify({ email, password }),
});
const authData = await authRes.json();
// Then use supabase (service-role) for all DB queries — uncontaminated
```

### 2. Supabase upsert with `ignoreDuplicates: true` returns null on conflict

When a row already exists, `ignoreDuplicates: true` does `ON CONFLICT DO NOTHING` and returns `null` data — NOT the existing row. Always re-fetch after such an upsert if you need the current row.

```js
await supabase.from('profiles').upsert({ id }, { onConflict: 'id', ignoreDuplicates: true });
const { data: profile } = await supabase.from('profiles').select('*').eq('id', id).single(); // re-fetch
```

### 3. No build step — syntax errors show in browser console, not terminal

After editing a JSX file, open browser DevTools → Console to see Babel compile errors. A syntax error in one JSX file will silently break all components in that file.

### 4. Script load order matters

In `index-light.html`, scripts are loaded top to bottom. `shared-light.jsx` must come first (it defines `window.PM_CONTENT`, `window.fetchSiteContent`, and all shared components). All other JSX files depend on it.

### 5. Supabase SQL migrations are manual

There is no CLI migration runner. Run `.sql` files manually in **Supabase Dashboard → SQL Editor**. SQL apostrophes must be escaped as `''` (double single-quote), not `\'`.

### 6. `is_admin` must be set manually in the database

New users always get `is_admin = false`. To grant admin access:
```sql
UPDATE profiles SET is_admin = true WHERE email = 'user@example.com';
```

### 7. `sharedProps` passed to all pages

Every page component receives:
```js
{ lang, setLang, setPage, user, setUser, cart, addToCart }
```

---

## Auth Flow

```
Login  →  POST /api/auth/login  →  returns { user, session.access_token }
           ↓
       window.API.saveToken(token, user)  →  saves to localStorage pm_light_state
           ↓
       setUser(user)  →  React state updated, Admin button appears if user.is_admin

On mount  →  GET /api/auth/me  →  refreshes user from DB (picks up is_admin changes)
```

---

## Deploy Checklist

1. Edit files locally
2. Test logic (check browser console for Babel errors)
3. For new DB tables: run the SQL migration in Supabase SQL Editor first
4. Push to GitHub:
   ```bash
   git add -A
   git commit -m "feat/fix: description"
   git push
   ```
5. Watch Vercel dashboard → deployment goes "Ready" in ~60 seconds
6. Test on live site

---

## Environment Variables (Vercel + local `.env.local`)

```
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_DINK_PRICE_ID
STRIPE_FLEX_PRICE_ID
RESEND_API_KEY
RESEND_FROM_EMAIL
ADMIN_EMAIL
APP_URL
```
