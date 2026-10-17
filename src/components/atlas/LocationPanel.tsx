'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  ChevronDown,
  ExternalLink,
  LocateFixed,
  Sparkles,
} from 'lucide-react';
import type { Location } from '@/types/content';
import { atlasCategoryOfLocation, atlasPlaceById, isKeyPlace, relatedLocations } from '@/lib/atlas';
import { hrefFor } from '@/lib/content';

function ageLabel(age?: string): string {
  if (age === 'third-age') return 'Third Age';
  if (age === 'second-age') return 'Second Age';
  if (age === 'first-age') return 'First Age';
  if (age === 'fourth-age') return 'Fourth Age';
  return age ? age.replace(/-/g, ' ') : 'Earlier Ages';
}

function DetailSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group border-t border-border/70">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 py-3 text-left font-display text-xs uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold-light">
        {title}
        <ChevronDown
          size={14}
          aria-hidden
          className="shrink-0 transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="pb-4 text-sm leading-relaxed text-parchment-2">{children}</div>
    </details>
  );
}

export default function LocationPanel({
  location,
  onClose,
  onSelectOnMap,
  onCenter,
}: {
  location: Location;
  onClose: () => void;
  /** Select & reveal another place that is on the map. */
  onSelectOnMap: (location: Location) => void;
  /** Centre the view on this place. */
  onCenter: () => void;
}) {
  const category = atlasCategoryOfLocation(location);
  const related = relatedLocations(location);
  const onMap = Boolean(atlasPlaceById.get(location.id));
  const key = isKeyPlace(location);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-border p-4">
        <div className="min-w-0">
          <button
            type="button"
            onClick={onClose}
            className="mb-2 inline-flex items-center gap-1.5 text-xs text-mist transition-colors hover:text-parchment-2"
          >
            <ArrowLeft size={13} aria-hidden />
            Back to places
          </button>
          <h2 className="font-display text-lg leading-tight text-parchment">{location.name}</h2>
          <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
            <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-gold-light">
              <span aria-hidden>{category.glyph}</span>
              {category.singular}
            </span>
            {location.region && (
              <span className="rounded-full border border-border bg-night-2/60 px-2 py-0.5 text-parchment-2">
                {location.region}
              </span>
            )}
            <span className="rounded-full border border-border bg-night-2/60 px-2 py-0.5 text-mist">
              {ageLabel(location.age)}
            </span>
            {key && (
              <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-gold-light">
                <Sparkles size={10} aria-hidden />
                Important place
              </span>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-mist transition-colors hover:bg-night-3 hover:text-parchment"
        >
          <span aria-hidden className="text-lg leading-none">×</span>
        </button>
      </div>

      {/* Body */}
      <div className="min-h-0 flex-1 overflow-y-auto px-4">
        <p className="py-4 text-sm leading-relaxed text-parchment-2">{location.summary}</p>

        {location.geography && (
          <DetailSection title="Geography" defaultOpen>
            <p>{location.geography}</p>
          </DetailSection>
        )}
        {location.history && (
          <DetailSection title="History & context">
            <p>{location.history}</p>
          </DetailSection>
        )}
        {location.inhabitants && (
          <DetailSection title="Inhabitants">
            <p>{location.inhabitants}</p>
          </DetailSection>
        )}
        {location.significance && (
          <DetailSection title="Why it matters">
            <p>{location.significance}</p>
          </DetailSection>
        )}
        {location.connections && (
          <DetailSection title="Connections">
            <p>{location.connections}</p>
          </DetailSection>
        )}

        {related.length > 0 && (
          <DetailSection title="Related places">
            <ul className="flex flex-wrap gap-2">
              {related.map((place) => {
                const placeOnMap = atlasPlaceById.get(place.id);
                return (
                  <li key={place.id}>
                    {placeOnMap ? (
                      <button
                        type="button"
                        onClick={() => onSelectOnMap(place)}
                        className="rounded-full border border-border bg-night-2/50 px-3 py-1 text-xs text-parchment-2 transition-colors hover:border-gold hover:text-gold-light"
                      >
                        {place.name}
                      </button>
                    ) : (
                      <Link
                        href={hrefFor('location', place.slug)}
                        className="rounded-full border border-border bg-night-2/50 px-3 py-1 text-xs text-mist transition-colors hover:border-gold hover:text-gold-light"
                      >
                        {place.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </DetailSection>
        )}

        {/* Coordinates */}
        <DetailSection title="Position on the atlas">
          {location.coordinates ? (
            <div className="space-y-2">
              <dl className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-md border border-border bg-night-2/50 px-3 py-2">
                  <dt className="text-mist">Across (west → east)</dt>
                  <dd className="mt-0.5 font-display text-base text-parchment">
                    ≈ {location.coordinates.x}%
                  </dd>
                </div>
                <div className="rounded-md border border-border bg-night-2/50 px-3 py-2">
                  <dt className="text-mist">Down (north → south)</dt>
                  <dd className="mt-0.5 font-display text-base text-parchment">
                    ≈ {location.coordinates.y}%
                  </dd>
                </div>
              </dl>
              <p className="text-xs leading-relaxed text-mist">
                Approximate position on the shared atlas image, given for orientation rather than
                cartographic precision. Regions and realms cover far more ground than a single
                point.
              </p>
            </div>
          ) : (
            <p className="text-xs leading-relaxed text-mist">
              This place belongs to an Age whose geography the Third-Age atlas image cannot hold,
              so it is documented as a text entry rather than a marker.
            </p>
          )}
        </DetailSection>
      </div>

      {/* Actions */}
      <div className="border-t border-border p-4">
        <div className="flex flex-wrap gap-2">
          <Link
            href={hrefFor('location', location.slug)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-gold/15 px-3 py-2 text-xs font-medium text-gold-light transition-colors hover:bg-gold/25"
          >
            Open full entry
            <ExternalLink size={12} aria-hidden />
          </Link>
          {onMap && (
            <button
              type="button"
              onClick={onCenter}
              className="inline-flex items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs text-parchment-2 transition-colors hover:border-gold hover:text-gold-light"
            >
              <LocateFixed size={12} aria-hidden />
              Center on map
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
