import type { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import EmptyState from '@/components/ui/EmptyState';
import { BulletList, Callout } from '@/components/ui/blocks';
import { getDiscussionHall, type DiscussionTopicListItem } from '@/lib/supabase/queries';
import {
  DISCUSSION_TAG_LABELS,
  DISCUSSION_TAGS,
  type DiscussionTag,
} from '@/types/discussions';

export const metadata: Metadata = {
  title: 'Discussion Hall',
  description:
    'The community layer of The Legend of Middle-earth — theories, debates and questions where every claim carries a source and a tag.',
  alternates: { canonical: '/discussions' },
};

// The Hall reads cookies (for the Supabase session) and live Postgres data,
// so it is always rendered per request — never frozen at build time.
export const dynamic = 'force-dynamic';

const planned: string[] = [
  'Posts tagged by evidence kind: canon, evidence, interpretation, opinion, adaptation and speculation',
  'Source-tagged posts — every claim can carry a reference into the works registry',
  'Sign-in via Supabase Auth, so contributions are attributed to real people rather than anonymous voices',
];

const tagChipClass: Record<DiscussionTag, string> = {
  canon: 'border-emerald/60 text-emerald',
  evidence: 'border-bronze/60 text-bronze',
  interpretation: 'border-gold/50 text-gold-light',
  opinion: 'border-border text-mist',
  adaptation: 'border-morgul/60 text-morgul',
  speculation: 'border-border text-parchment-2',
};

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'recently';
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function TopicCard({ topic }: { topic: DiscussionTopicListItem }) {
  const excerpt = topic.body.length > 280 ? `${topic.body.slice(0, 280)}…` : topic.body;
  return (
    <article className="panel p-5 transition-colors hover:border-gold/40">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${tagChipClass[topic.tag]}`}
        >
          {DISCUSSION_TAG_LABELS[topic.tag] ?? topic.tag}
        </span>
        <span className="text-[11px] text-mist">{formatDate(topic.created_at)}</span>
        <span className="ml-auto flex items-center gap-3 text-[11px] text-mist">
          <span aria-label={`${topic.reply_count} replies`}>
            {topic.reply_count} {topic.reply_count === 1 ? 'reply' : 'replies'}
          </span>
          <span aria-label={`Score ${topic.score}`}>
            {topic.score >= 0 ? '+' : ''}
            {topic.score}
          </span>
        </span>
      </div>
      <h3 className="mt-3 font-display text-xl text-parchment">{topic.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-mist">{excerpt}</p>
    </article>
  );
}

export default async function DiscussionsPage() {
  const hall = await getDiscussionHall();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Breadcrumbs items={[{ label: 'Discussion Hall' }]} />
      <SectionHeading
        eyebrow="Community"
        title="Discussion Hall"
        intro="A space for theories, debates and questions about the legendarium — where a claim can carry a source, and a theory never masquerades as a quotation."
      />

      {hall === null ? (
        <>
          <EmptyState
            title="The Hall is being prepared"
            message="Community features open once the Supabase backend is connected. Public lore browsing works without an account."
          />
          <div className="mt-14">
            <h2 className="mb-4 font-display text-2xl text-parchment">What the Hall will offer</h2>
            <div className="rule-gold mb-6" />
            <BulletList items={planned} />
            <p className="mt-6 text-sm leading-relaxed text-mist">
              Nothing here is seeded: there are no sample or fabricated discussions. When posts
              appear, they will be written by real members and tagged for exactly what they are.
            </p>
          </div>
        </>
      ) : (
        <>
          <Callout title="How the Hall keeps its word">
            <p>
              Posting requires a Supabase Auth account, so every contribution is attached to a real
              person. Claims are labelled with their evidence kind below a title, and moderation can
              hide anything that breaks the rules — hidden content is never served to readers.
            </p>
          </Callout>

          <div className="mt-8">
            <h2 className="mb-3 font-display text-xl text-parchment">Categories</h2>
            <div className="rule-gold mb-6" />
            <ul className="grid gap-3 sm:grid-cols-2">
              {hall.categories.map((category) => (
                <li key={category.id} className="panel-soft p-4">
                  <p className="font-display text-sm text-gold-light">{category.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-mist">{category.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="mb-3 font-display text-2xl text-parchment">Recent topics</h2>
            <div className="rule-gold mb-6" />
            {hall.awaitingFirstPost ? (
              <EmptyState
                title="The Hall is quiet — the first word is yours"
                message="No one has posted yet, and nothing has been placed here artificially. Once sign-in is wired up, this is where the first real conversation begins."
              />
            ) : (
              <ul className="space-y-4">
                {hall.topics.map((topic) => (
                  <li key={topic.id}>
                    <TopicCard topic={topic} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-12 rounded-xl border border-border p-5">
            <h2 className="font-display text-xs uppercase tracking-[0.2em] text-gold">
              How claims are labelled
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DISCUSSION_TAGS.map((t) => (
                <div key={t.value} className="flex gap-3">
                  <span
                    className={`mt-0.5 h-fit shrink-0 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${tagChipClass[t.value]}`}
                  >
                    {t.label}
                  </span>
                  <p className="text-xs leading-relaxed text-mist">{t.blurb}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}