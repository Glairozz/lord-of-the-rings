import type {
  DiscussionCategory,
  DiscussionReply,
  DiscussionTag,
  DiscussionTopic,
  DiscussionVote,
} from './discussions';

/**
 * Minimal Supabase database shape for the discussion Hall.
 *
 * The public lore archive never touches Postgres — this typing exists only for
 * the four community tables created in
 * `supabase/migrations/20250101000000_discussion_hall.sql`. If you start
 * generating types with the Supabase CLI, replace this file with the output of
 * `supabase gen types typescript`.
 */
export interface Database {
  public: {
    Tables: {
      discussion_categories: {
        Row: DiscussionCategory;
        Insert: Pick<DiscussionCategory, 'slug' | 'name'> &
          Partial<Pick<DiscussionCategory, 'description' | 'sort_order'>>;
        Update: Partial<DiscussionCategory>;
        Relationships: [];
      };
      discussion_topics: {
        Row: DiscussionTopic;
        Insert: Pick<DiscussionTopic, 'category_id' | 'title' | 'body' | 'author_id'> &
          Partial<Pick<DiscussionTopic, 'tag' | 'source_ids' | 'status'>>;
        Update: Partial<Pick<DiscussionTopic, 'title' | 'body' | 'tag' | 'source_ids'>>;
        Relationships: [];
      };
      discussion_replies: {
        Row: DiscussionReply;
        Insert: Pick<DiscussionReply, 'topic_id' | 'author_id' | 'body'> &
          Partial<Pick<DiscussionReply, 'status'>>;
        Update: Partial<Pick<DiscussionReply, 'body'>>;
        Relationships: [];
      };
      discussion_votes: {
        Row: DiscussionVote;
        Insert: Pick<DiscussionVote, 'user_id' | 'direction' | 'topic_id' | 'reply_id'>;
        Update: Partial<Pick<DiscussionVote, 'direction'>>;
        Relationships: [];
      };
    };
    Views: {
      discussion_topic_summary: {
        Row: DiscussionTopic & { reply_count: number };
        Relationships: [];
      };
    };
    Functions: {
      topic_scores: {
        Args: { p_ids: string[] };
        Returns: { id: string; score: number }[];
      };
      reply_scores: {
        Args: { p_ids: string[] };
        Returns: { id: string; score: number }[];
      };
    };
  };
}

export type DiscussionTables = Database['public']['Tables'];
export type DiscussionTopicRow = DiscussionTables['discussion_topics']['Row'];
export type DiscussionReplyRow = DiscussionTables['discussion_replies']['Row'];
export type DiscussionVoteRow = DiscussionTables['discussion_votes']['Row'];
export type DiscussionVoteTarget = 'topic' | 'reply';
export type DiscussionTagRow = DiscussionTag;