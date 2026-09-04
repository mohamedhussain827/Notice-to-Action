# Notice-to-Action — Server

A real Express.js backend for Notice-to-Action, using a **Google Sheet as the database**.
Each tab in the sheet works like a table — no MongoDB/SQL server to host or pay for, and you
can literally open the spreadsheet and see your data.

```
Users | Notices | Tasks | Documents | Reminders | Notifications   ← sheet tabs = tables
```

---

## 1. Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet.
   Name it anything, e.g. **Notice-to-Action DB**.
2. Copy the Sheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/`**`THIS_LONG_ID`**`/edit`
3. You don't need to create the tabs by hand — the seed script (step 4) creates them for you
   with the correct headers.

## 2. Create a Google Cloud service account

A service account is a robot account your server logs in as — no OAuth login screen needed.

1. Go to [console.cloud.google.com](https://console.cloud.google.com) and create (or pick) a project.
2. **APIs & Services → Library** → search **Google Sheets API** → **Enable**.
3. **APIs & Services → Credentials → Create Credentials → Service account**. Give it any name.
4. Open the new service account → **Keys** tab → **Add Key → Create new key → JSON**.
   A `.json` file downloads — keep it safe, it's a password.
5. Open that JSON file. You need two fields from it:
   - `client_email` → looks like `something@your-project.iam.gserviceaccount.com`
   - `private_key` → a long string starting with `-----BEGIN PRIVATE KEY-----`

## 3. Share the sheet with the service account

Back in your Google Sheet: click **Share**, paste in the `client_email` from step 2, give it
**Editor** access, and send. Without this step, every API call will fail with a permissions error.

## 4. Configure and seed

```bash
cd server
npm install
cp .env.example .env
```

Open `.env` and fill in:

```
GOOGLE_SHEET_ID=the id from step 1
GOOGLE_CLIENT_EMAIL=the client_email from step 2
GOOGLE_PRIVATE_KEY="the private_key from step 2, keep the quotes and \n as-is"
JWT_SECRET=any long random string
```

Then create the tabs/headers automatically:

```bash
npm run seed
```

You should see: `✅ Done. Your sheet now has all 6 required tabs...`
Open the spreadsheet — you'll see the tabs and header rows appear.

## 5. Run it

```bash
npm run dev       # auto-restarts on changes
# or
npm start
```

Visit `http://localhost:4000/health` — you should get `{"ok":true,...}`.

---

## API reference

All routes except `/health`, `/api/auth/register`, and `/api/auth/login` require an
`Authorization: Bearer <token>` header (the token comes back from register/login).

| Method | Route | Who | What |
|---|---|---|---|
| POST | `/api/auth/register` | anyone | Create an account (`role`: student/faculty/admin) |
| POST | `/api/auth/login` | anyone | Log in, get a JWT |
| GET | `/api/notices` | any logged-in user | List notices (filter with `?department=&year=&category=`) |
| GET | `/api/notices/:id` | any logged-in user | One notice + its required documents |
| POST | `/api/notices/analyze` | any logged-in user | Send `{ text }`, get back extracted fields — **doesn't save anything** |
| POST | `/api/notices` | any logged-in user | Publish/save a notice (+ optional `documents: []`) |
| DELETE | `/api/notices/:id` | admin only | Remove a notice |
| GET | `/api/tasks` | any logged-in user | Your own tasks |
| POST | `/api/tasks` | any logged-in user | Create a task under a notice |
| PATCH | `/api/tasks/:id` | any logged-in user | `{ "status": "Completed" }` |
| GET | `/api/notifications` | any logged-in user | Your own notifications, newest first |
| PATCH | `/api/notifications/:id/read` | any logged-in user | Mark one as read |

### Example: register → analyze a notice

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Aditi Sharma","email":"aditi@college.edu","password":"Demo@1234","role":"student","department":"CSE","year":"2nd Year"}'
# → { "token": "...", "user": {...} }

curl -X POST http://localhost:4000/api/notices/analyze \
  -H "Authorization: Bearer PASTE_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"text":"All second-year CSE students are required to submit the scholarship renewal form along with their income certificate and Aadhaar copy on or before September 15."}'
```

---

## AI extraction: rule-based by default, real AI if you want it

`/api/notices/analyze` uses a keyword/regex parser out of the box — deterministic, free, and it
never invents a fact that isn't in the text (matches the spec's accuracy requirement).

To use real AI extraction instead, just set in `.env`:

```
ANTHROPIC_API_KEY=your-key-here
```

The server will call the Claude API and fall back to the rule-based parser automatically if that
call ever fails, so extraction never breaks even if the AI service is down.

---

## Connecting the frontend

The `index.html` prototype currently stores everything in browser storage. To point it at this
real API instead, its `fetch`-free mock functions (`submitAuth`, `saveActionPlan`, `toggleTask`,
etc.) need to be swapped for real `fetch()` calls to these endpoints, and the JWT stored (e.g. in
a JS variable, kept in memory) and sent as `Authorization: Bearer <token>` on every request. Happy
to do that wiring next if you want a single connected app instead of two separate pieces.

---

## Deploying

- **Backend** → [Render](https://render.com) or [Railway](https://railway.app): connect this repo,
  set the same environment variables from `.env`, build command `npm install`, start command `npm start`.
- **Database** → nothing to deploy — it's just your Google Sheet.
- **Frontend** → [Vercel](https://vercel.com), pointed at your deployed backend's URL.

## A note on Google Sheets as a database

This is genuinely fine for an MVP, a class project, or moderate real usage — it's free, human-readable,
and needs zero DB ops. It is **not** built for high write-concurrency or very large datasets (Google's
API has read/write rate limits, and lookups are linear scans over rows). If this ever needs to scale
past a few hundred students actively using it at once, migrating to MongoDB Atlas later is a schema-compatible
move — the six tabs above map directly to the six collections from the original spec.
