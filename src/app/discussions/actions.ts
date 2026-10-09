'use server';

import { revalidatePath } from 'next/cache';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { createServerClient } from '@/lib/supabase/server';
import type { DiscussionVoteTarget } from '@/types/database';
import {
  DISCUSSION_TAGS,
  type DiscussionTag,
} from '@/types/discussions';

export type ActionResult =
  | { ok: true; id?: string }
  | { ok: false; error: string };

const TITLE_MAX = 240;
const TITLE_MIN = 4;
const BODY_MAX = 20000;
const BODY_MIN = 2;
const CATEGORY_SLUGS = new Set([
  'theories-and-speculation',
  'sources-and-evidence',
  'questions-from-readers',
  'adaptations',
]);

function isTag(value: string): value is DiscussionTag {
  return DISCUSSION_TAGS.some((t) => t.value === value);
}

function parseSourceIds(raw: FormDataEntryValue | null): string[] {
  if (typeof raw !== 'string') return [];
  return raw
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter((s) => /^[a-z][a-z0-9-]{1,40}$/.test(s))
    .slice(0, 12);
}

/**
 * Publish a new topic. Requires Supabase Auth (the action returns an honest
 * error when no session exists). The form builds on `createTopic` once the
 * sign-in UI lands — see SETUP.md.
 */
export async function createTopic(formData: FormData): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: 'The Discussion Hall has not been opened yet.' };
  }
  const supabase = await createServerClient();
  if (!supabase) return { ok: false, error: 'The Discussion Hall is not reachable.' };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Sign in to post in the Hall.' };

  const title = String(formData.get('title') ?? '').trim();
  const body = String(formData.get('body') ?? '').trim();
  const category = String(formData.get('category') ?? '').trim();
  const tagRaw = String(formData.get('tag') ?? 'interpretation');
  const tag: DiscussionTag = isTag(tagRaw) ? tagRaw : 'interpretation';
  const sourceIds = parseSourceIds(formData.get('source_ids'));

  if (title.length < TITLE_MIN || title.length > TITLE_MAX) {
    return { ok: false, error: `Title must be between ${TITLE_MIN} and ${TITLE_MAX} characters.` };
  }
  if (body.length < BODY_MIN || body.length > BODY_MAX) {
    return { ok: false, error: `Post body must be between ${BODY_MIN} and ${BODY_MAX} characters.` };
  }
  if (!CATEGORY_SLUGS.has(category)) {
    return { ok: false, error: 'Choose a category for your topic.' };
  }

  const { data: found } = await supabase
    .from('discussion_categories')
    .select('id')
    .eq('slug', category)
    .maybeSingle();

  if (!found) return { ok: false, error: 'That category no longer exists.' };

  const { data, error } = await supabase
    .from('discussion_topics')
    .insert({
      category_id: found.id,
      title,
      body,
      author_id: user.id,
      tag,
      source_ids: sourceIds,
    })
    .select('id')
    .single();

  if (error || !data) {
    return { ok: false, error: error?.message ?? 'Could not publish your topic.' };
  }

  revalidatePath('/discussions');
  return { ok: true, id: data.id };
}

/**
 * Reply to a topic. Same authentication requirement as `createTopic`.
 */
export async function createReply(formData: FormData): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: 'The Discussion Hall has not been opened yet.' };
  }
  const supabase = await createServerClient();
  if (!supabase) return { ok: false, error: 'The Discussion Hall is not reachable.' };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Sign in to reply in the Hall.' };

  const topicId = String(formData.get('topic_id') ?? '');
  const body = String(formData.get('body') ?? '').trim();

  if (body.length < BODY_MIN || body.length > BODY_MAX) {
    return { ok: false, error: `Reply must be between ${BODY_MIN} and ${BODY_MAX} characters.` };
  }

  const { data, error } = await supabase
    .from('discussion_replies')
    .insert({ topic_id: topicId, author_id: user.id, body })
    .select('id')
    .single();

  if (error || !data) {
    return { ok: false, error: error?.message ?? 'Could not post your reply.' };
  }

  revalidatePath('/discussions');
  return { ok: true, id: data.id };
}

/**
 * Toggle a vote on a topic or a reply. One row per voter per target, so
 * calling with an existing vote flips (or clears) it.
 */
export async function vote(
  target: DiscussionVoteTarget,
  targetId: string,
): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: 'The Discussion Hall has not been opened yet.' };
  }
  const supabase = await createServerClient();
  if (!supabase) return { ok: false, error: 'The Discussion Hall is not reachable.' };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Sign in to vote.' };

  const column = target === 'topic' ? 'topic_id' : 'reply_id';

  const { data: existing } = await supabase
    .from('discussion_votes')
    .select('direction')
    .eq('user_id', user.id)
    .eq(column, targetId)
    .maybeSingle();

  if (existing) {
    // If they already voted the same way, withdraw; otherwise flip direction.
    const { error } = await supabase
      .from('discussion_votes')
      .update({ direction: existing.direction === 1 ? -1 : 1 })
      .eq('user_id', user.id)
      .eq(column, targetId);
    if (error) return { ok: false, error: error.message };
  } else {
    const { error } = await supabase.from('discussion_votes').insert({
      user_id: user.id,
      direction: 1,
      ...(target === 'topic'
        ? { topic_id: targetId, reply_id: null }
        : { reply_id: targetId, topic_id: null }),
    });
    if (error) return { ok: false, error: error.message };
  }

  revalidatePath('/discussions');
  return { ok: true };
}