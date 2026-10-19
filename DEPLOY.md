# Deploying Vetrix

One Next.js app serves both the website and the admin (`/admin`, Payload CMS). It needs Node.js and a
Postgres database. Nothing else runs alongside it.

## Requirements

- **Node.js 20.9 or newer** (developed on Node 22).
- **Postgres 14 or newer**: your own server, or a hosted one (Neon, RDS, etc.).
- **A persistent folder** for uploaded images (see [Uploaded images](#uploaded-images)).

## Environment variables

Copy `.env.example` to `.env` on the server (never commit it):

| Variable | What it is |
| --- | --- |
| `DATABASE_URL` | Postgres connection string (see [Which database](#which-database)). |
| `PAYLOAD_SECRET` | Long random string; signs admin logins. Generate one with `openssl rand -hex 32`. Keep it the same across deploys. |
| `PAYLOAD_DISABLE_DEPENDENCY_CHECKER` | `true`. Turns off a dev-only Payload check that clashes with Next 16. |
| `PORT` | Optional; the port `npm start` listens on (default 3000). |

## Which database

**Keep the content already entered (the usual case).** The content team has been editing in the admin
against a Neon database created by `npm run dev`. To go live with that content:

1. Make a copy of it for production, so local development never touches the live site:
   - **Staying on Neon:** in the Neon console, *Branches → New branch* from the main branch. It copies
     all the data instantly and gives a new connection string.
   - **Your own Postgres:** `pg_dump --no-owner "<neon url>" > vetrix.sql`, then `psql "<server url>" < vetrix.sql`.
2. Point `DATABASE_URL` at the copy and run, once:
   ```bash
   npm run db:adopt
   ```
   A database made by `npm run dev` doesn't record migrations, so production would try to create
   tables that already exist (and stop at an interactive prompt). This marks the existing migrations
   as applied. It changes nothing else.
3. Copy the **`media/` folder** from the machine that ran the admin (the content team's PC,
   `C:\Mazaya\vetrix\media`) to the project root on the server. It holds every image the database
   points to.

**Or receive the content as a file.** The content team runs `npm run db:export` on their PC. It makes a
`vetrix-export` folder with `database.sql` (all the content and admin accounts) and `media/` (the images).
They zip it and send it. On the server, with `DATABASE_URL` pointing at a new, empty database, and
**before the first `npm start`** (otherwise the site fills itself with the default content):

```bash
npm run payload migrate                     # creates the empty tables
npm run db:import -- ./vetrix-export        # fills them and copies the images into ./media
```

If the images were sent separately, put them in `media/` at the project root; `db:import` only needs
`database.sql`.

**Or start fresh.** On a new, empty database nothing needs preparing: the first start creates the tables
and fills in the design's content and images.

## First deploy

```bash
npm ci
npm run build      # the database must be reachable: pages are prerendered from its content
npm start          # or run it under pm2/systemd, see below
```

What happens on the first start against an **empty** database, with no manual steps (an adopted
database already has its tables and content, so both steps are skipped):

1. **Tables are created** by the migrations in `src/migrations` (Payload runs them when it starts in production).
2. **Content is filled in**: every page's text and the images from `public/images` are copied into the admin
   (`src/payload/seed`). Content that already exists is never overwritten.
3. Open **`https://<domain>/admin`**. The first visit asks you to create the first admin account
   (an adopted database keeps its existing admin accounts).

Put it behind your usual reverse proxy (nginx, Caddy…) with HTTPS. Example nginx block:

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    client_max_body_size 20m;   # image uploads in the admin
}
```

Keep it running with pm2: `pm2 start npm --name vetrix -- start`.

## Uploaded images

Images uploaded in the admin are saved to the **`media/` folder at the project root** (it is in `.gitignore`).
That folder must:

- survive redeploys (don't wipe it when pulling a new release; in Docker, mount it as a volume);
- be backed up together with the database.

If you would rather keep them in S3 / Cloudflare R2, add Payload's `@payloadcms/storage-s3` plugin in
`src/payload.config.ts`.

## Updating the site

```bash
git pull
npm ci
npm run build
pm2 restart vetrix
```

New migrations, if any, run automatically on start.

## Changing the admin fields

1. Edit the fields in `src/payload/globals` or `src/payload/collections`.
2. `npm run generate:types` to refresh `src/payload-types.ts`.
3. `npm run payload migrate:create <short-name>` to create the migration, then commit it with the change.

Locally, `npm run dev` syncs the database schema directly, so the migration is only needed for production.

## Good to know

- **Run one instance.** The pages are cached in the server's memory and cleared when someone saves in the admin.
  With several instances behind a load balancer, only the instance that handled the save would refresh.
- **Contact form** messages are stored in the admin under **Messages**. No email is sent yet; add an email
  adapter in `src/payload.config.ts` if you want a notification for each message.
- **Image licence:** the "Core Identity" image on the About page came from the design with an Unsplash+
  watermark. Replace it from the admin with a licensed image before going live.
- **Checks:** `npm run lint` and `npx tsc --noEmit` both pass. `npm run build` and `npm start` pass both against an
  empty database and against a copy of a `npm run dev` database after `npm run db:adopt`.
