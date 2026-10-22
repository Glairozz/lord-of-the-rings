import type { Continuity } from '@/types/content';
import { characters } from '@/data/characters';
import { peoples } from '@/data/peoples';
import { continuityMeta } from '@/lib/content';
import {
  characterAffiliations,
  characterGroupById,
  groupsForCharacter,
  primaryGroupForCharacter,
  rolesForCharacter,
  type CharacterRole,
} from '@/data/character-groups';

/**
 * Presentation helpers for the character archive.
 *
 * The character records in `src/data/characters.ts` stay untouched: everything
 * a card or a filter needs is derived here from the existing data plus the
 * taxonomy in `src/data/character-groups.ts`.
 */

export interface CharacterDirectoryItem {
  id: string;
  slug: string;
  name: string;
  summary: string;
  image?: string;
  href: string;
  continuity: Continuity;
  /** Human label for the continuity badge, e.g. "Tolkien’s texts". */
  continuityLabel: string;
  /** Primary race / creature-type group id. */
  groupId: string;
  /** Primary group label, e.g. "Hobbits & Halflings". */
  groupLabel: string;
  /** Every group the character belongs to (a figure may appear in several). */
  groupIds: string[];
  /** The people, culture or kindred the character belongs to. */
  people: string;
  peopleId?: string;
  /** Allegiance or faction, where the record supports one. */
  affiliation: string;
  /** Curated roles, e.g. ["Hero", "Ruler"]. */
  roles: CharacterRole[];
  titles: string[];
  aliases: string[];
  /** Extra text folded into the search index. */
  keywords: string;
}

const peopleById = new Map(peoples.map((p) => [p.id, p]));

/** Display name for a people / culture id, falling back to a readable id. */
export function peopleName(peopleId: string | undefined): string {
  if (!peopleId) return 'Unrecorded';
  return peopleById.get(peopleId)?.name ?? peopleId;
}

/** The set of characters that belong to no group at all (should be empty). */
export function ungroupedCharacters(): string[] {
  return characters
    .filter((c) => !primaryGroupForCharacter(c.id))
    .map((c) => c.id);
}

/** Build the directory model used by the character browser. */
export function characterDirectoryItems(): CharacterDirectoryItem[] {
  return characters.map((c) => {
    const groups = groupsForCharacter(c.id);
    const primary = primaryGroupForCharacter(c.id);
    const titles = c.titles ?? [];
    const aliases = c.aliases ?? [];
    const roles = rolesForCharacter(c.id);

    return {
      id: c.id,
      slug: c.slug,
      name: c.name,
      summary: c.summary,
      image: c.image,
      href: `/characters/${c.slug}`,
      continuity: c.continuity,
      continuityLabel: continuityMeta[c.continuity].label,
      groupId: primary?.id ?? 'other',
      groupLabel: primary?.label ?? 'Other Peoples',
      groupIds: groups.map((g) => g.id),
      people: peopleName(c.peopleId),
      peopleId: c.peopleId,
      affiliation: characterAffiliations[c.id] ?? peopleName(c.peopleId),
      roles,
      titles,
      aliases,
      keywords: [
        ...aliases,
        ...titles,
        ...roles,
        c.peopleId ? peopleName(c.peopleId) : '',
        primary?.label ?? '',
        ...groups.map((g) => g.label),
        c.summary,
      ]
        .filter(Boolean)
        .join(' '),
    };
  });
}

/** Characters from a given group id, in the order the taxonomy lists them. */
export function charactersInGroup(groupId: string): CharacterDirectoryItem[] {
  const group = characterGroupById.get(groupId);
  if (!group) return [];
  const byId = new Map(characterDirectoryItems().map((item) => [item.id, item]));
  return group.members
    .map((id) => byId.get(id))
    .filter((item): item is CharacterDirectoryItem => Boolean(item));
}
