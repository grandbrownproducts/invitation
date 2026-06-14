# Backend Deployment Guide

This covers setting up Firebase for the admin dashboard, guest management,
and RSVP system, and deploying the site.

## 1. Create a Firebase project

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. **Authentication** → Sign-in method → enable **Email/Password**.
3. **Firestore Database** → Create database (production mode, pick a region close to your users).
4. **Storage** → Create default bucket (not heavily used yet, but initialized for future use).

## 2. Get the web app config (client SDK)

1. Project settings → General → "Your apps" → Add app → Web.
2. Copy the config values into `.env.local` (copy `.env.local.example` first):
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

## 3. Get the service account (Admin SDK)

1. Project settings → Service accounts → Generate new private key. This downloads a JSON file.
2. From that JSON, fill in `.env.local`:
   - `FIREBASE_ADMIN_PROJECT_ID` ← `project_id`
   - `FIREBASE_ADMIN_CLIENT_EMAIL` ← `client_email`
   - `FIREBASE_ADMIN_PRIVATE_KEY` ← `private_key` (keep it wrapped in quotes, keep the `\n` sequences)

Set `NEXT_PUBLIC_SITE_URL` to your production domain (used to build invitation links).

**Never commit the service account JSON or `.env.local` to git.**

## 4. Install dependencies and run locally

```bash
npm install
npm run dev
```

## 5. Create your admin account

1. Firebase Console → Authentication → Users → Add user. Enter the couple's email + a password.
2. Grant the `admin` custom claim (required to sign in to `/administrator`):

```bash
node --env-file=.env.local scripts/setAdminClaim.mjs <email-you-just-created>
```

3. Seed default wedding settings (used for the invitation pages and WhatsApp template):

```bash
node --env-file=.env.local scripts/seedSettings.mjs
```

4. Visit `/administrator/login` and sign in with that email/password.

## 6. Deploy Firestore security rules

Install the Firebase CLI if you don't have it, then log in and deploy:

```bash
npm install -g firebase-tools
firebase login
firebase init firestore   # select your project, accept defaults (firestore.rules already exists)
firebase deploy --only firestore:rules
```

## 7. Deploy the app (Vercel)

1. Push the repo to GitHub and import it into [Vercel](https://vercel.com/).
2. Add all variables from `.env.local` as Environment Variables in the Vercel project settings
   (Production + Preview). For `FIREBASE_ADMIN_PRIVATE_KEY`, paste the value including the
   `\n` escape sequences exactly as in `.env.local`.
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain (e.g. `https://vihanga-sandali.wedding`).
4. Deploy.
5. **Update the Website URL setting**: go to `/administrator/settings` on the live site and
   set **Website URL** to the same production domain. This field (stored in `settings/wedding`
   in Firestore) is what's used to build invitation links and WhatsApp messages — it's
   independent of the `NEXT_PUBLIC_SITE_URL` env var, which only sets the *default* the first
   time settings are seeded. If you change domains later, update it here (no redeploy needed).

## Using the admin dashboard

- `/administrator` — redirects to the dashboard (or login if signed out)
- `/administrator/dashboard` — guest/RSVP stats overview
- `/administrator/guests` — add, edit, delete, bulk-import guests; send WhatsApp invitations
- `/administrator/analytics` — charts (accepted vs declined, groom vs bride side, invitation progress)
- `/administrator/settings` — couple names, wedding date/venue, WhatsApp invitation message template

Each guest gets a personalized invitation link at `/invitation/<guestId>` (shown after adding a
guest, and used automatically when building the WhatsApp invite message). Guests can accept or
decline directly from that page; the dashboard updates immediately.
