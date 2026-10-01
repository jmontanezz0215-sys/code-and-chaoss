# Code & Chaos — GitHub + Vercel

This is the complete editable Vercel project. It preserves the site's pages, portfolio, reviews, contact/audit forms, sales assistant, images, and original hero video. The mobile hero uses its original background layout with the animation shifted 24 pixels to the right. Hosting adaptations do not change the public design.

## 1. Put this project on GitHub

Extract code-and-chaos-vercel.zip. Upload the extracted project's contents to your GitHub repository, keeping package.json, app, public, and vercel.json at the repository's top level. GitHub Desktop can publish the extracted project too. Do not upload the ZIP itself as the repository content.

The example environment file contains blank placeholders. Never commit real API keys, passwords, .env files, node_modules, or .next. The supplied .gitignore excludes those files.

## 2. Import GitHub into Vercel

In Vercel select Add New → Project, connect GitHub, and import this repository. Framework: Next.js. Root directory: the folder containing package.json (normally leave it at the repository root). Use the provided build command and automatically detected package manager. Select Node.js 22.x. No Cloudflare Worker, _worker.js, or wrangler.json is needed for this project.

Set these environment variables for Production and any Preview environment where forms should work:

| Variable | Value |
| --- | --- |
| CLOUDFLARE_ACCOUNT_ID | Cloudflare account ID for the leads database |
| CLOUDFLARE_D1_DATABASE_ID | D1 database ID |
| CLOUDFLARE_D1_API_TOKEN | Cloudflare API token with D1 read/write permissions limited to that account |
| RESEND_API_KEY | Resend API key |
| NOTIFICATION_FROM_EMAIL | Sender address on your Resend-verified domain |

Use the existing leads database if you already have one. For a new D1 database, initialize the tables with the SQL in drizzle/0000_initial.sql (or the SQL file in drizzle if its name differs) through the Cloudflare D1 console. Do not reinitialize an existing database or delete its inquiries.

Without database settings, inquiry submission reports failure and retains the visitor's form entries. Without email settings, saved inquiries do not generate email. Notification recipient remains jmontanezz0215@icloud.com; a Resend-verified sender is required. These settings are entered in Vercel, not in GitHub source.

Optional settings:
- OPENAI_API_KEY and OPENAI_MODEL: enable live AI; otherwise the prepared sales/FAQ assistant remains available.
- INBOX_USERNAME and INBOX_PASSWORD: choose an owner username and a strong unique password to access /inbox. Vercel uses browser Basic Authentication over HTTPS instead of Sites-only ChatGPT sign-in. The inbox stays locked when these are absent. It also checks authorization inside the page before reading inquiries.
- GA4_MEASUREMENT_ID and GOOGLE_SITE_VERIFICATION: analytics and Search Console verification.

Deploy. When adding or changing environment variables, redeploy so the new values apply. Test one inquiry and confirm the saved record and email delivery. No account credentials or stored inquiries are embedded in this project.

## 3. Keep the domain in Cloudflare

In the Vercel project's Settings → Domains, add codenchaos.dev and optionally www.codenchaos.dev. Vercel will show the exact DNS records required. Add those records in Cloudflare's DNS dashboard; there is no need to transfer your domain or change its nameservers to Vercel. Follow Vercel's verification instructions and use DNS only for the Vercel records during setup. Canonical URLs and sitemap entries already use https://codenchaos.dev.

## Checks performed

Next.js production build and TypeScript passed; 60 pages/build outputs were generated. Homepage, contact, pricing, about, automotive portfolio, robots.txt, sitemap.xml, and original video returned HTTP 200 locally. The inbox rejected unauthorized and spoofed Sites headers. Sales fallback and the database adapter's success/error handling were tested. Design, testimonials, portfolio, and video components match the existing site. Live Cloudflare database access and real email delivery require your account settings and have not been verified.

## Local work

Use pnpm 10.17.1, run pnpm install --frozen-lockfile, then pnpm dev. Production checks: pnpm build. The pnpm lockfile is included. The archive excludes generated build output; Vercel builds from the source.

Official references:
- https://vercel.com/docs/frameworks/full-stack/nextjs
- https://vercel.com/docs/domains/set-up-custom-domain
- https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/query/
