export type DiscussionTag =
  | 'canon'
  | 'evidence'
  | 'interpretation'
  | 'opinion'
  | 'adaptation'
  | 'speculation';

export type DiscussionStatus = 'published' | 'hidden';

export type DiscussionCategory = {
  id: number;
  slug: string;
  name: string;
  description: string;
  sort_order: number;
};

export type DiscussionTopic = {
  id: string;
  category_id: number;
  title: string;
  body: string;
  author_id: string;
  tag: DiscussionTag;
  source_ids: string[];
  status: DiscussionStatus;
  created_at: string;
  updated_at: string;
};

export type DiscussionReply = {
  id: string;
  topic_id: string;
  author_id: string;
  body: string;
  status: DiscussionStatus;
  created_at: string;
  updated_at: string;
};

export type DiscussionVote = {
  user_id: string;
  topic_id: string | null;
  reply_id: string | null;
  direction: 1 | -1;
  created_at: string;
};

/** The allowed evidencing tags, shown in the Hall so every claim is labelled. */
export const DISCUSSION_TAGS: { value: DiscussionTag; label: string; blurb: string }[] = [
  {
    value: 'canon',
    label: 'Canon',
    blurb: 'Stated outright in the works themselves.',
  },
  {
    value: 'evidence',
    label: 'Evidence',
    blurb: 'Built from specific textual clues and citations.',
  },
  {
    value: 'interpretation',
    label: 'Interpretation',
    blurb: 'Analysis and reading; explicitly not a quotation.',
  },
  {
    value: 'opinion',
    label: 'Opinion',
    blurb: 'A personal preference or judgement, clearly marked.',
  },
  {
    value: 'adaptation',
    label: 'Adaptation',
    blurb: 'About films, games or other versions — separated from the books.',
  },
  {
    value: 'speculation',
    label: 'Speculation',
    blurb: 'Open conjecture with nothing masquerading as evidence.',
  },
];

export const DISCUSSION_TAG_LABELS: Record<DiscussionTag, string> = Object.fromEntries(
  DISCUSSION_TAGS.map((t) => [t.value, t.label]),
) as Record<DiscussionTag, string>;