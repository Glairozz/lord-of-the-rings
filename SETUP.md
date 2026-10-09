# Setting up the Discussion Hall (Supabase)

The Discussion Hall is the only part of this site that talks to a database.
Everything else — characters, locations, artifacts, the atlas, history, library,
themes and search — is static content that works with **no environment
variables at all**. Adding Supabase only opens the community layer and never
touches the reading experience.

There is **no seeded or fabricated community content**. The migration inserts
only the four structural categories. The Hall opens empty; real members fill it.

## 1. Create your Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** → **New query**.

## 2. Apply the schema + security migration

Run the contents of:

```
supabase/migrations/20250101000000_discussion_hall.sql
```

in the SQL Editor, or if you use the [Supabase CLI](https://supabase.com/docs/guides/cli):

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

The migration creates four tables with Row Level Security enabled:

| Table | What it holds | Who can read | Who can write |
| --- | --- | --- | --- |
| `discussion_categories` | Structural categories | Everyone | Service role only |
| `discussion_topics` | Posts | Everyone (published only) | Authenticated authors (own posts) |
| `discussion_replies` | Replies | Everyone (on published topics) | Authenticated authors (own replies) |
| `discussion_votes` | Votes (private rows) | Only the voter | Authenticated voters (own votes) |

Aggregate scores are computed by security-definer functions so a public count
never reveals *who* voted. Hidden (`status = 'hidden'`) topics and replies are
invisible to readers but need **no** destructive deletion.

## 3. Copy your keys into `.env.local`

From **Project Settings → API**, copy the Project URL, the anon/public key and
the service role key into `.env.local` (create it by copying `.env.example`):

```
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service role key>
```

- `NEXT_PUBLIC_*` values are safe to embed in the browser bundle.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only. It is read by
  `src/lib/supabase/server.ts` for moderation and must never reach a client
  component or be committed to the repository. `.env*` is gitignored.

Restart the dev server (`npm run dev`) after adding them. The Hall now shows
its real state — categories and any published topics — instead of the
"being prepared" placeholder.

## 4. Enable sign-in (Supabase Auth)

Posting and voting require authentication, enforced **inside every server
action** in `src/app/discussions/actions.ts` (never rely on middleware alone).

1. In **Authentication → Providers**, enable the providers you want (email
   magic-link is the lightest option for a reading community).
2. Add your site URL to **URL Configuration** (e.g. `http://localhost:3000`
   locally and your production domain later).
3. Build the sign-in UI on top of `createClient()` from
   `src/lib/supabase/client.ts` (client) and `src/lib/supabase/server.ts`
   (server). The actions already return honest, typed errors — they are the
   contract the future forms will call.

> **Next.js 16 note:** the old `middleware.ts` convention is deprecated and
> renamed to `proxy.ts` in this version. You can add a session-refreshing
> `proxy.ts` later, but the codebase currently refreshes sessions inside the
> server functions, which the Next.js docs recommend as the safer pattern.

## 5. Moderation

To hide a topic or reply that breaks the rules, update its `status` to
`hidden` in the **Table Editor** (or with a query). RLS then keeps it out of
every reader's view. Use the service role in any admin tooling.

## 6. Rebuilding

If you later generate types with the Supabase CLI, replace
`src/types/database.ts` with `supabase gen types typescript`. The app types are
a hand-maintained mirror of the migration so nothing blocks early development.