import 'server-only';
import type { DiscussionCategory, DiscussionTag } from '@/types/discussions';
import { createServerClient } from './server';

export interface DiscussionTopicListItem {
  id: string;
  category_id: number;
  title: string;
  body: string;
  author_id: string;
  tag: DiscussionTag;
  source_ids: string[];
  reply_count: number;
  score: number;
  created_at: string;
  updated_at: string;
}

export interface DiscussionHallData {
  configured: true;
  categories: DiscussionCategory[];
  topics: DiscussionTopicListItem[];
  /** True when the backend is connected but no one has posted yet. */
  awaitingFirstPost: boolean;
}

export type DiscussionHallResult = DiscussionHallData | null;

const MAX_TOPICS = 25;

/**
 * Server-side snapshot of the Discussion Hall: categories plus the most recent
 * published topics with their reply counts and aggregate scores.
 *
 * Returns `null` when Supabase is not configured (the placeholder page stays
 * honest about the backend being closed). Never throws — a failed read falls
 * back to the same null state so the page degrades gracefully.
 */
export async function getDiscussionHall(): Promise<DiscussionHallResult> {
  const supabase = await createServerClient();
  if (!supabase) return null;

  const [{ data: categories }, { data: topics }] = await Promise.all([
    supabase
      .from('discussion_categories')
      .select('id, slug, name, description, sort_order')
      .order('sort_order', { ascending: true }),
    supabase
      .from('discussion_topic_summary')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(MAX_TOPICS),
  ]);

  if (!topics) return null;
  const safeCategories: DiscussionCategory[] = categories ?? [];

  // One round trip for every topic's aggregate score (security definer).
  let scores = new Map<string, number>();
  if (topics.length > 0) {
    const { data } = await supabase.rpc('topic_scores', {
      p_ids: topics.map((t) => t.id),
    });
    scores = new Map((data ?? []).map((row) => [row.id, row.score]));
  }

  const sortedTopics = [...topics].sort(
    (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at),
  );

  return {
    configured: true,
    categories: safeCategories,
    topics: sortedTopics.map((t) => ({
      id: t.id,
      category_id: t.category_id,
      title: t.title,
      body: t.body,
      author_id: t.author_id,
      tag: t.tag,
      source_ids: t.source_ids ?? [],
      reply_count: t.reply_count ?? 0,
      score: scores.get(t.id) ?? 0,
      created_at: t.created_at,
      updated_at: t.updated_at,
    })),
    awaitingFirstPost: sortedTopics.length === 0,
  };
}