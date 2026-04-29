# Pickle Master 匹匠 — Website

Premier Indoor Pickleball Club · Hong Kong  
**Design System Version** — Light Theme

---

## Project Structure

```
pickle-master/
├── assets/
│   ├── logo.jpg              # Club logo
│   └── Court_layout.jpeg     # Court photo
│
├── website/
│   ├── index-light.html      # ← Main entry point (light theme)
│   ├── index.html            # Original dark theme
│   ├── lang.js               # EN / ZH translations
│   │
│   ├── shared-light.jsx      # Nav, Footer, Cart (light theme)
│   ├── HomePage-light.jsx    # Home page (light theme)
│   ├── MemberPage-light.jsx  # Membership tiers page
│   ├── BookPage.jsx          # Court booking + calendar
│   ├── OtherPages-light.jsx  # Social, Private, Contact, Login, Account
│   └── MorePages-light.jsx   # Coaches, Tournament, Shop, FAQ
│
└── README.md
```

---

## Pages

| Page | Route (in-app) | File |
|------|---------------|------|
| Home | `home` | `HomePage-light.jsx` |
| Membership | `member` | `MemberPage-light.jsx` |
| Book a Court | `book` | `BookPage.jsx` |
| Social Play | `social` | `OtherPages-light.jsx` |
| Private / Corporate | `private` | `OtherPages-light.jsx` |
| Contact | `contact` | `OtherPages-light.jsx` |
| Login / Register | `login` | `OtherPages-light.jsx` |
| My Account | `account` | `OtherPages-light.jsx` |
| Coaches | `coaches` | `MorePages-light.jsx` |
| Tournament | `tournament` | `MorePages-light.jsx` |
| Shop | `shop` | `MorePages-light.jsx` |
| FAQ | `faq` | `MorePages-light.jsx` |

---

## Tech Stack

- **React 18** (via CDN, no build step required)
- **Babel Standalone** (JSX compiled in-browser)
- **Vanilla CSS** (inline styles + design tokens)
- **Google Fonts** — Playfair Display SC, Playfair Display, DM Sans, Oswald
- **No backend** — all data is currently mocked/local

---

## Running Locally

No install needed. Just open the file in a browser:

```bash
# Option A — double-click
open website/index-light.html

# Option B — local server (recommended, avoids CORS on .jsx imports)
npx serve .
# then visit http://localhost:3000/website/index-light.html

# Option C — Python
python3 -m http.server 8080
# then visit http://localhost:8080/website/index-light.html
```

> ⚠️ Opening directly via `file://` may block `.jsx` imports in some browsers.  
> Use a local server (Option B or C) for best results.

---

## Deployment

### Option 1 — Netlify Drop (fastest, no account)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire project root folder onto the page
3. You get a live URL instantly (e.g. `https://pickle-master-abc123.netlify.app`)
4. Set publish directory to `/` and entry point to `website/index-light.html`

---

### Option 2 — Vercel (recommended for ongoing dev)

**First deploy:**
```bash
npm i -g vercel
vercel
# Follow prompts — set root to project folder
```

**Set output in `vercel.json`** (create this file at project root):
```json
{
  "rewrites": [
    { "source": "/", "destination": "/website/index-light.html" }
  ]
}
```

**Redeploy after changes:**
```bash
vercel --prod
```

You get a permanent URL like `pickle-master.vercel.app`.

---

### Option 3 — GitHub + Vercel (best for team dev)

1. Push project to GitHub:
```bash
git init
git add .
git commit -m "Initial commit — Pickle Master light theme"
git remote add origin https://github.com/YOUR_USERNAME/pickle-master.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) → **Import Git Repository**
3. Select your repo → set **Root Directory** to `/`
4. Add the `vercel.json` above → Deploy

**Every `git push` now auto-deploys.** Vercel also creates a **preview URL for every branch** — perfect for testing changes before going live.

---

## Making Changes

### Edit copy / content
All text strings live in `website/lang.js` — edit there for both EN and ZH simultaneously.

### Edit a specific page
Open the relevant `.jsx` file and edit. Pages are self-contained React components.

| Want to change | Edit this file |
|----------------|---------------|
| Nav, Footer, Cart | `shared-light.jsx` |
| Home hero video | `HomePage-light.jsx` → `<video src="...">` |
| Testimonials | `HomePage-light.jsx` → `testimonials` array |
| Membership pricing | `lang.js` → `member_dink_price` etc. |
| Coaches | `MorePages-light.jsx` → `coaches` array |
| Translations | `lang.js` |

### Swap stock photos for real club photos
Replace Pexels URLs with your own image paths:
```jsx
// Before
src="https://images.pexels.com/photos/..."

// After (put your photos in assets/)
src="../assets/your-photo.jpg"
```

---

## Connecting a Real Backend

The site currently mocks all data. Below are recommended services to wire up each feature:

| Feature | Recommended Service | Free Tier |
|---------|-------------------|-----------|
| User auth (login/register) | [Supabase Auth](https://supabase.com) | ✅ Yes |
| Database (bookings, members) | [Supabase](https://supabase.com) | ✅ Yes |
| Payments (court booking, shop) | [Stripe](https://stripe.com) | ✅ Yes |
| Email confirmation | [Resend](https://resend.com) | ✅ Yes |
| File storage (photos) | [Supabase Storage](https://supabase.com) | ✅ Yes |

### Suggested backend integration order:
1. **Auth** — replace mock login with Supabase Auth
2. **Bookings** — store court reservations in Supabase DB
3. **Payments** — add Stripe Checkout for booking + shop
4. **Email** — send booking confirmations via Resend

---

## Custom Domain

Once deployed on Vercel or Netlify:
1. Buy `picklemaster.hk` from a registrar (e.g. [Namecheap](https://namecheap.com))
2. In Vercel dashboard → **Domains** → Add `picklemaster.hk`
3. Update your DNS records as instructed
4. HTTPS is automatically provisioned

---

## Design System

Colour tokens, typography, spacing and component specs live in:
```
colors_and_type.css
```

Preview all design tokens at:
```
preview/colors-brand.html
preview/type-display.html
preview/buttons.html
... etc
```

---

## Contact

**Pickle Master 匹匠**  
We Go Mall, Ma On Shan, New Territories, Hong Kong  
[picklemaster.hk](https://picklemaster.hk)

---

*Last updated: April 2026*
