-- ============================================================================
-- Discussion Hall — community schema, Row Level Security and helpers
-- The Legend of Middle-earth
--
-- Design notes (kept deliberately honest):
--   * The public lore archive never touches Postgres. Learn RLS protects ONLY
--     the community layer: categories, topics, replies and votes.
--   * Nothing here seeds or fabricates discussion content. Only the four
--     structural categories are inserted, so the Hall opens empty and real
--     members fill it.
--   * A topic or reply whose status is 'hidden' is invisible to readers.
--     Hiding is a moderator action and is performed with the service role.
--   * Votes are kept private: a visitor can only read their own vote rows.
--     Aggregate scores are exposed through the security-definer functions at
--     the bottom so a public count never leaks who voted.
--   * Views used by the app are created with security_invoker = true so the
--     caller's Row Level Security still applies to the underlying tables.
-- ============================================================================

begin;

-- ----------------------------------------------------------------------------
-- Categories (structural configuration, not community content)
-- ----------------------------------------------------------------------------
create table public.discussion_categories (
  id bigint generated always as identity primary key,
  slug text not null unique,
  name text not null,
  description text not null default '',
  sort_order integer not null default 0 check (sort_order >= 0)
);

comment on table public.discussion_categories is
  'Structural category definitions for the Discussion Hall. Pure configuration; contains no member content.';

insert into public.discussion_categories (slug, name, description, sort_order) values
  ('theories-and-speculation', 'Theories & Speculation', 'Carefully reasoned theories and open questions — always labelled as interpretation, never as quotation.', 1),
  ('sources-and-evidence', 'Sources & Evidence', 'Claims backed by the works registry, with page-level references where they exist.', 2),
  ('questions-from-readers', 'Questions from Readers', 'Things you have always wondered about the legendarium.', 3),
  ('adaptations', 'Adaptations & Their Choices', 'Films, games and other adaptations — what they change, and why separating them from the books matters.', 4);

-- ----------------------------------------------------------------------------
-- Topics
-- ----------------------------------------------------------------------------
create table public.discussion_topics (
  id uuid primary key default gen_random_uuid(),
  category_id bigint not null references public.discussion_categories (id) on delete restrict,
  title text not null check (char_length(title) between 4 and 240),
  body text not null check (char_length(body) between 2 and 20000),
  author_id uuid not null references auth.users (id) on delete cascade,
  tag text not null default 'interpretation'
    check (tag in ('canon', 'evidence', 'interpretation', 'opinion', 'adaptation', 'speculation')),
  source_ids text[] not null default '{}',
  status text not null default 'published' check (status in ('published', 'hidden')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.discussion_topics.tag is
  'How the post should be read: canon (stated in the works), evidence (textual), interpretation (analysis), opinion, adaptation (non-book media), speculation.';
comment on column public.discussion_topics.source_ids is
  'Slugs into the site source registry (lotr, silmarillion, ...). Kept as free-text slugs so the app can resolve them.';

-- ----------------------------------------------------------------------------
-- Replies
-- ----------------------------------------------------------------------------
create table public.discussion_replies (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.discussion_topics (id) on delete cascade,
  author_id uuid not null references auth.users (id) on delete cascade,
  body text not null check (char_length(body) between 2 and 20000),
  status text not null default 'published' check (status in ('published', 'hidden')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- Votes (private rows; scores are aggregated through definer functions)
-- ----------------------------------------------------------------------------
create table public.discussion_votes (
  user_id uuid not null references auth.users (id) on delete cascade,
  topic_id uuid references public.discussion_topics (id) on delete cascade,
  reply_id uuid references public.discussion_replies (id) on delete cascade,
  direction smallint not null default 1 check (direction in (-1, 1)),
  created_at timestamptz not null default now(),
  constraint discussion_votes_exactly_one_target check (
    (topic_id is not null and reply_id is null)
    or (topic_id is null and reply_id is not null)
  ),
  primary key (user_id, topic_id, reply_id)
);

-- ----------------------------------------------------------------------------
-- updated_at maintenance
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger discussion_topics_set_updated_at
  before update on public.discussion_topics
  for each row execute function public.set_updated_at();

create trigger discussion_replies_set_updated_at
  before update on public.discussion_replies
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- Indexes
-- ----------------------------------------------------------------------------
create index discussion_topics_category_created_idx
  on public.discussion_topics (category_id, created_at desc);
create index discussion_topics_status_created_idx
  on public.discussion_topics (status, created_at desc);
create index discussion_replies_topic_created_idx
  on public.discussion_replies (topic_id, created_at);
create index discussion_votes_topic_idx on public.discussion_votes (topic_id);
create index discussion_votes_reply_idx on public.discussion_votes (reply_id);

-- ----------------------------------------------------------------------------
-- Row Level Security
-- ----------------------------------------------------------------------------
alter table public.discussion_categories enable row level security;
alter table public.discussion_topics enable row level security;
alter table public.discussion_replies enable row level security;
alter table public.discussion_votes enable row level security;

-- Categories: readable by everyone, writable only by the service role.
create policy "Categories are publicly readable"
  on public.discussion_categories
  for select to anon, authenticated
  using (true);

-- Visibility of a topic given to any viewer (security definer so inner RLS on
-- discussion_topics does not interfere with the check itself).
create or replace function public.topic_is_visible(p_topic_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.discussion_topics t
    where t.id = p_topic_id and t.status = 'published'
  );
$$;

-- Topics
create policy "Published topics are publicly readable"
  on public.discussion_topics
  for select to anon, authenticated
  using (status = 'published');

create policy "Members can publish topics"
  on public.discussion_topics
  for insert to authenticated
  with check (author_id = auth.uid());

create policy "Authors can update their published topics"
  on public.discussion_topics
  for update to authenticated
  using (author_id = auth.uid())
  with check (author_id = auth.uid() and status = 'published');

create policy "Authors can delete their published topics"
  on public.discussion_topics
  for delete to authenticated
  using (author_id = auth.uid());

-- Replies
create policy "Replies on visible topics are publicly readable"
  on public.discussion_replies
  for select to anon, authenticated
  using (status = 'published' and public.topic_is_visible(topic_id));

create policy "Members can reply"
  on public.discussion_replies
  for insert to authenticated
  with check (author_id = auth.uid());

create policy "Authors can update their published replies"
  on public.discussion_replies
  for update to authenticated
  using (author_id = auth.uid())
  with check (author_id = auth.uid() and status = 'published');

create policy "Authors can delete their published replies"
  on public.discussion_replies
  for delete to authenticated
  using (author_id = auth.uid());

-- Votes: a voter sees only their own rows (used to pre-fill the UI state).
create policy "Voters can read their own votes"
  on public.discussion_votes
  for select to authenticated
  using (user_id = auth.uid());

create policy "Members can vote"
  on public.discussion_votes
  for insert to authenticated
  with check (user_id = auth.uid());

create policy "Voters can change their vote"
  on public.discussion_votes
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "Voters can withdraw their vote"
  on public.discussion_votes
  for delete to authenticated
  using (user_id = auth.uid());

-- ----------------------------------------------------------------------------
-- Reader-facing view: published topics with their published reply counts.
-- security_invoker keeps the caller's RLS on topics and replies intact.
-- Votes are deliberately NOT read here (see functions below).
-- ----------------------------------------------------------------------------
create view public.discussion_topic_summary
with (security_invoker = true) as
select
  t.id,
  t.category_id,
  t.title,
  t.body,
  t.author_id,
  t.tag,
  t.source_ids,
  t.status,
  t.created_at,
  t.updated_at,
  (select count(*)::bigint
     from public.discussion_replies r
    where r.topic_id = t.id and r.status = 'published') as reply_count
from public.discussion_topics t;

comment on view public.discussion_topic_summary is
  'Public topics with published reply counts. Caller RLS applies (security_invoker).';

-- ----------------------------------------------------------------------------
-- Aggregate vote scores, computed with definer rights so the count never
-- exposes who voted. Call with an array of ids in a single round trip:
--   select * from public.topic_scores(array[...]::uuid[]);
-- ----------------------------------------------------------------------------
create or replace function public.topic_scores(p_ids uuid[])
returns table (id uuid, score bigint)
language sql
stable
security definer
set search_path = ''
as $$
  select v.topic_id as id, sum(v.direction)::bigint as score
  from public.discussion_votes v
  where v.topic_id = any (p_ids)
  group by v.topic_id;
$$;

create or replace function public.reply_scores(p_ids uuid[])
returns table (id uuid, score bigint)
language sql
stable
security definer
set search_path = ''
as $$
  select v.reply_id as id, sum(v.direction)::bigint as score
  from public.discussion_votes v
  where v.reply_id = any (p_ids)
  group by v.reply_id;
$$;

-- ----------------------------------------------------------------------------
-- Privileges
-- ----------------------------------------------------------------------------
grant usage on schema public to anon, authenticated;

grant select on public.discussion_categories to anon, authenticated;

grant select on public.discussion_topics to anon, authenticated;
grant insert, update, delete on public.discussion_topics to authenticated;

grant select on public.discussion_replies to anon, authenticated;
grant insert, update, delete on public.discussion_replies to authenticated;

grant select on public.discussion_votes to authenticated;
grant insert, update, delete on public.discussion_votes to authenticated;

grant select on public.discussion_topic_summary to anon, authenticated;

grant execute on function public.topic_is_visible(uuid) to anon, authenticated;
grant execute on function public.topic_scores(uuid[]) to anon, authenticated;
grant execute on function public.reply_scores(uuid[]) to anon, authenticated;

commit;