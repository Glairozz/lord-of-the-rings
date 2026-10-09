'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import Link from 'next/link';
import { Home, LocateFixed, Maximize, Minimize, Search, X, ZoomIn, ZoomOut } from 'lucide-react';
import type { Location } from '@/types/content';
import { locations } from '@/data/locations';
import { mapImages } from '@/data/images';
import { hrefFor } from '@/lib/content';
import LoreImage from '@/components/ui/LoreImage';

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

/** The stage is drawn at this fixed size and scaled by `transform`. */
const MAP_W = 1000;
const MAP_H = 1013; // source is 2370×2401, near square
const MIN_ZOOM = 0.25;
const MAX_ZOOM = 8;
const ZOOM_STEP = 1.25;
const CENTER_ZOOM = 1.6;
const FIT_PADDING = 24;

/** A location that can be placed on the map. */
type LayeredLocation = Location & { coordinates: { x: number; y: number } };

type LayerFilter = 'third-age' | 'second-age' | 'off-map';

const layerOptions: { id: LayerFilter; label: string }[] = [
  { id: 'third-age', label: 'Third Age' },
  { id: 'second-age', label: 'Second Age' },
  { id: 'off-map', label: 'Off-map' },
];

/**
 * Markers are drawn only for Third-Age places, which are the ones the image
 * can honestly hold. Númenor (Second Age) and Gondolin and Doriath (First
 * Age) carry coordinates too, but placing them on a Third-Age map would put
 * water where there is land and land where there is sea — so they are kept
 * as text entries in the "documented elsewhere" list.
 */
const onMap = locations.filter(
  (l): l is LayeredLocation => l.mapLayer === 'third-age' && l.coordinates !== undefined,
);
const offMap = locations.filter((l) => !(l.mapLayer === 'third-age' && l.coordinates !== undefined));
const secondAge = offMap.filter((l) => l.mapLayer === 'second-age');

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

function ageLabel(age?: string): string {
  if (age === 'third-age') return 'Third Age';
  if (age === 'second-age') return 'Second Age';
  if (age === 'first-age') return 'First Age';
  return 'Earlier Ages';
}

function typeLabel(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, ' ');
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function AtlasExplorer() {
  const viewportRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [layerFilter, setLayerFilter] = useState<LayerFilter>('third-age');
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  /** Mirror of the view used by event listeners that are attached once. */
  const viewRef = useRef({ zoom, tx, ty });
  useEffect(() => {
    viewRef.current = { zoom, tx, ty };
  }, [zoom, tx, ty]);

  const pointersRef = useRef(new Map<number, { x: number; y: number }>());
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startTx: number;
    startTy: number;
  } | null>(null);
  const pinchRef = useRef<{
    dist: number;
    midX: number;
    midY: number;
    zoom: number;
    tx: number;
    ty: number;
  } | null>(null);

  /* ----------------------------- view math ------------------------ */

  const setView = useCallback((nextZoom: number, nextTx: number, nextTy: number) => {
    viewRef.current = { zoom: nextZoom, tx: nextTx, ty: nextTy };
    setZoom(nextZoom);
    setTx(nextTx);
    setTy(nextTy);
  }, []);

  /** Keep at least part of the image inside the viewport. */
  const clampView = useCallback(
    (nextZoom: number, nextTx: number, nextTy: number, vw: number, vh: number) => {
      const sw = MAP_W * nextZoom;
      const sh = MAP_H * nextZoom;
      return {
        zoom: clamp(nextZoom, MIN_ZOOM, MAX_ZOOM),
        tx: clamp(nextTx, Math.min(vw - sw, 0), Math.max(vw - sw, 0)),
        ty: clamp(nextTy, Math.min(vh - sh, 0), Math.max(vh - sh, 0)),
      };
    },
    [],
  );

  /** Fit the whole map, centred, with padding — the resting view. */
  const fitView = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    const fit = clamp(
      Math.min((width - FIT_PADDING * 2) / MAP_W, (height - FIT_PADDING * 2) / MAP_H),
      MIN_ZOOM,
      1,
    );
    setView(fit, (width - MAP_W * fit) / 2, (height - MAP_H * fit) / 2);
  }, [setView]);

  /**
   * Zoom by `factor` keeping the map point under the cursor fixed.
   * screen = T + zoom·P, so after changing zoom the translate must become
   * T' = C − k·(C − T) with k = zoom'/zoom.
   */
  const zoomAt = useCallback(
    (clientX: number, clientY: number, factor: number) => {
      const el = viewportRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;
      const v = viewRef.current;
      const nextZoom = clamp(v.zoom * factor, MIN_ZOOM, MAX_ZOOM);
      const k = nextZoom / v.zoom;
      const clamped = clampView(
        nextZoom,
        px - (px - v.tx) * k,
        py - (py - v.ty) * k,
        rect.width,
        rect.height,
      );
      setView(clamped.zoom, clamped.tx, clamped.ty);
    },
    [clampView, setView],
  );

  const zoomBy = useCallback(
    (factor: number) => {
      const el = viewportRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, factor);
    },
    [zoomAt],
  );

  /** Move the view so a marker sits at the centre of the viewport. */
  const centerOnMarker = useCallback(
    (loc: LayeredLocation) => {
      const el = viewportRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nextZoom = clamp(CENTER_ZOOM, MIN_ZOOM, MAX_ZOOM);
      const px = (loc.coordinates.x / 100) * MAP_W;
      const py = (loc.coordinates.y / 100) * MAP_H;
      setView(nextZoom, rect.width / 2 - px * nextZoom, rect.height / 2 - py * nextZoom);
    },
    [setView],
  );

  /* ----------------------------- effects -------------------------- */

  // Initial fit, and re-fit whenever the viewport changes size (resize,
  // fullscreen, mobile URL-bar collapse).
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    fitView();
    const ro = new ResizeObserver(fitView);
    ro.observe(el);
    return () => ro.disconnect();
  }, [fitView]);

  // Wheel zoom needs a non-passive listener so preventDefault works.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [zoomAt]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  // Escape clears the selection.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* --------------------------- pointer pan & pinch ---------------- */

  const handlePointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    // Leave buttons (markers, zoom controls, panel links) to themselves.
    if ((e.target as HTMLElement).closest('button')) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const v = viewRef.current;

    if (pointersRef.current.size === 1) {
      dragRef.current = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        startTx: v.tx,
        startTy: v.ty,
      };
      setIsDragging(true);
    } else if (pointersRef.current.size === 2) {
      dragRef.current = null;
      const [a, b] = [...pointersRef.current.values()];
      pinchRef.current = {
        dist: Math.hypot(b.x - a.x, b.y - a.y),
        midX: (a.x + b.x) / 2,
        midY: (a.y + b.y) / 2,
        zoom: v.zoom,
        tx: v.tx,
        ty: v.ty,
      };
      setIsDragging(false);
    }
  }, []);

  const handlePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!pointersRef.current.has(e.pointerId)) return;
      pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const rect = e.currentTarget.getBoundingClientRect();
      const pts = [...pointersRef.current.values()];

      if (pinchRef.current && pts.length === 2) {
        // Two-finger pinch: scale about the moving midpoint, keeping the
        // map point that was under the start midpoint under the current one.
        const [a, b] = pts;
        const dist = Math.hypot(b.x - a.x, b.y - a.y);
        const midX = (a.x + b.x) / 2;
        const midY = (a.y + b.y) / 2;
        const p = pinchRef.current;
        const nextZoom = clamp((dist / p.dist) * p.zoom, MIN_ZOOM, MAX_ZOOM);
        const k = nextZoom / p.zoom;
        const clamped = clampView(
          nextZoom,
          midX - (p.midX - p.tx) * k,
          midY - (p.midY - p.ty) * k,
          rect.width,
          rect.height,
        );
        setView(clamped.zoom, clamped.tx, clamped.ty);
        return;
      }

      const d = dragRef.current;
      if (d && e.pointerId === d.pointerId) {
        const clamped = clampView(
          viewRef.current.zoom,
          d.startTx + (e.clientX - d.startX),
          d.startTy + (e.clientY - d.startY),
          rect.width,
          rect.height,
        );
        setView(clamped.zoom, clamped.tx, clamped.ty);
      }
    },
    [clampView, setView],
  );

  const endPointer = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(e.pointerId);
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* capture already released */
    }

    if (pinchRef.current && pointersRef.current.size < 2) {
      pinchRef.current = null;
      const remaining = [...pointersRef.current.entries()];
      if (remaining.length === 1) {
        const [id, pos] = remaining[0];
        const v = viewRef.current;
        dragRef.current = { pointerId: id, startX: pos.x, startY: pos.y, startTx: v.tx, startTy: v.ty };
        setIsDragging(true);
      } else {
        setIsDragging(false);
      }
      return;
    }

    if (dragRef.current && e.pointerId === dragRef.current.pointerId) {
      dragRef.current = null;
      setIsDragging(false);
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else if (el.requestFullscreen) {
      void el.requestFullscreen();
    }
  }, []);

  /* --------------------------- derived data ------------------------ */

  const selected = useMemo(
    () => onMap.find((l) => l.id === selectedId) ?? null,
    [selectedId],
  );

  const matches = useCallback(
    (l: Location) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return [l.name, ...(l.aliases ?? []), l.region ?? '', l.type, l.summary]
        .join(' ')
        .toLowerCase()
        .includes(q);
    },
    [query],
  );

  const filteredOnMap = useMemo(() => onMap.filter(matches), [matches]);
  const filteredOffMap = useMemo(() => offMap.filter(matches), [matches]);
  const filteredSecondAge = useMemo(() => secondAge.filter(matches), [matches]);

  const focusAndCenter = useCallback(
    (loc: LayeredLocation) => {
      setSelectedId(loc.id);
      centerOnMarker(loc);
    },
    [centerOnMarker],
  );

  /* ----------------------------- render ---------------------------- */

  return (
    <div className="panel overflow-hidden">
      {/* Toolbar: legend note-chips per layer + hint */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-mist">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-gold" aria-hidden />
            Third Age on the map · {onMap.length}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-bronze" aria-hidden />
            Second Age · {secondAge.length} off-map
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-mist" aria-hidden />
            First Age · {offMap.length - secondAge.length} off-map
          </span>
        </div>
        <p className="ml-auto hidden text-xs text-mist sm:block">Drag to pan · Scroll to zoom</p>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_21rem]">
        {/* Map viewport */}
        <div
          ref={viewportRef}
          role="application"
          aria-label="Interactive map of Middle-earth, drag to pan, use buttons to zoom"
          className={`relative aspect-square min-h-[56vh] w-full touch-none select-none overflow-hidden bg-night-2 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          } ${isFullscreen ? 'aspect-auto h-full' : 'lg:aspect-auto lg:h-[70vh]'}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
        >
          {/* Stage: fixed-size map scaled and translated as a unit */}
          <div
            className="absolute left-0 top-0"
            style={{
              width: MAP_W,
              height: MAP_H,
              transform: `translate(${tx}px, ${ty}px) scale(${zoom})`,
              transformOrigin: '0 0',
            }}
          >
            <LoreImage
              src={mapImages.middleEarth}
              alt="Map of Middle-earth in the late Third Age"
              width={MAP_W}
              height={MAP_H}
              priority
              sizes="1000px"
              className="block h-auto w-full"
            />

            {onMap.map((loc) => {
              const isSelected = selectedId === loc.id;
              return (
                <button
                  key={loc.id}
                  type="button"
                  className="map-marker group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${loc.coordinates.x}%`,
                    top: `${loc.coordinates.y}%`,
                  }}
                  aria-label={`${loc.name}, ${loc.region ?? loc.type}`}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedId(loc.id)}
                  onFocus={() => setSelectedId(loc.id)}
                >
                  <span
                    className={`block rounded-full bg-gold ring-gold-light ${
                      isSelected
                        ? 'h-3.5 w-3.5 shadow-[0_0_0_4px_rgba(200,162,74,0.3)] ring-2'
                        : 'h-2.5 w-2.5 ring-2 ring-gold-light/60 transition-[width,height,opacity] group-hover:scale-125'
                    }`}
                  />
                  <span
                    className={`pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-night-2/95 px-1.5 py-0.5 font-display text-[10px] tracking-wide text-parchment shadow-md transition-opacity ${
                      isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {loc.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Zoom controls overlay */}
          <div
            className="absolute right-3 top-3 z-20 flex flex-col gap-1.5"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => zoomBy(ZOOM_STEP)}
              aria-label="Zoom in"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-night-2/90 text-parchment backdrop-blur transition-colors hover:border-gold/60 hover:text-gold"
            >
              <ZoomIn size={16} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => zoomBy(1 / ZOOM_STEP)}
              aria-label="Zoom out"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-night-2/90 text-parchment backdrop-blur transition-colors hover:border-gold/60 hover:text-gold"
            >
              <ZoomOut size={16} aria-hidden />
            </button>
            <button
              type="button"
              onClick={fitView}
              aria-label="Reset view"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-night-2/90 text-parchment backdrop-blur transition-colors hover:border-gold/60 hover:text-gold"
            >
              <Home size={16} aria-hidden />
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-night-2/90 text-parchment backdrop-blur transition-colors hover:border-gold/60 hover:text-gold"
            >
              {isFullscreen ? <Minimize size={16} aria-hidden /> : <Maximize size={16} aria-hidden />}
            </button>
          </div>

          {/* Selected-place info panel */}
          {selected && (
            <div
              className="panel-soft absolute bottom-3 left-3 right-3 z-20 max-w-sm p-4 sm:right-auto"
              role="status"
              aria-live="polite"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                aria-label="Close details"
                className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded text-mist transition-colors hover:text-parchment"
              >
                <X size={14} aria-hidden />
              </button>
              <p className="pr-6 font-display text-base text-parchment">{selected.name}</p>
              <p className="mt-1 flex flex-wrap gap-1.5 text-[11px]">
                <span className="rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-gold-light">
                  {typeLabel(selected.type)}
                </span>
                {selected.region && (
                  <span className="rounded-full border border-border bg-night-2/60 px-2 py-0.5 text-parchment-2">
                    {selected.region}
                  </span>
                )}
                <span className="rounded-full border border-border bg-night-2/60 px-2 py-0.5 text-mist">
                  {ageLabel(selected.age)}
                </span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-parchment-2">{selected.summary}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Link
                  href={hrefFor('location', selected.slug)}
                  className="rounded-md bg-gold/15 px-3 py-1.5 text-xs font-medium text-gold-light transition-colors hover:bg-gold/25"
                >
                  Open entry →
                </Link>
                <button
                  type="button"
                  onClick={() => centerOnMarker(selected)}
                  className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-parchment-2 transition-colors hover:border-gold/60 hover:text-gold"
                >
                  <LocateFixed size={12} aria-hidden />
                  Center on map
                </button>
              </div>
              <p className="mt-3 border-t border-border/60 pt-2 text-[11px] text-mist">
                {filteredOnMap.length} of {onMap.length} places shown · {offMap.length} earlier
                places documented elsewhere
              </p>
            </div>
          )}
        </div>

        {/* Sidebar: search + layer chips + results */}
        <aside className="flex flex-col border-t border-border lg:border-l lg:border-t-0 lg:max-h-[70vh]">
          <div className="space-y-3 border-b border-border p-4">
            <div className="relative">
              <Search
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-mist"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search places, regions, aliases…"
                aria-label="Search places in the atlas"
                className="w-full rounded-md border border-border bg-night-2/70 py-2 pl-9 pr-9 text-sm text-parchment placeholder:text-mist focus:border-gold/60 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded text-mist transition-colors hover:text-parchment"
                >
                  <X size={12} aria-hidden />
                </button>
              )}
            </div>
            <div role="group" aria-label="Filter places by Age" className="flex flex-wrap gap-2">
              {layerOptions.map((opt) => {
                const active = layerFilter === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setLayerFilter(opt.id)}
                    aria-pressed={active}
                    className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                      active
                        ? 'border-gold/70 bg-gold/15 text-gold-light'
                        : 'border-border bg-night-2/60 text-mist hover:text-parchment'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="max-h-80 flex-1 overflow-y-auto p-4 lg:max-h-none">
            {layerFilter === 'third-age' && (
              <>
                <h3 className="font-display text-xs uppercase tracking-[0.2em] text-gold">
                  Places on the map · {filteredOnMap.length}
                </h3>
                {filteredOnMap.length === 0 ? (
                  <p className="mt-3 text-sm text-mist">No places match your search.</p>
                ) : (
                  <ul className="mt-2 space-y-1">
                    {filteredOnMap.map((loc) => {
                      const isSelected = selectedId === loc.id;
                      return (
                        <li key={loc.id}>
                          <button
                            type="button"
                            onClick={() => focusAndCenter(loc)}
                            aria-pressed={isSelected}
                            className={`flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left transition-colors ${
                              isSelected
                                ? 'border-gold/50 bg-gold/10'
                                : 'border-transparent hover:border-border hover:bg-night-2/50'
                            }`}
                          >
                            <span className="min-w-0 flex-1">
                              <span
                                className={`block truncate text-sm ${isSelected ? 'text-gold-light' : 'text-parchment'}`}
                              >
                                {loc.name}
                              </span>
                              <span className="block truncate text-xs text-mist">
                                {loc.region ?? typeLabel(loc.type)}
                              </span>
                            </span>
                            <LocateFixed
                              size={14}
                              aria-hidden
                              className={isSelected ? 'text-gold' : 'text-mist'}
                            />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}

                <div className="mt-5 border-t border-border pt-4">
                  <h4 className="font-display text-xs uppercase tracking-[0.2em] text-gold">
                    Documented elsewhere · {offMap.length}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-mist">
                    Places of the First and Second Ages cannot sit on a Third-Age map; they are kept
                    as text entries in the archive.
                  </p>
                  <ul className="mt-2 space-y-1">
                    {offMap.map((loc) => (
                      <li key={loc.id}>
                        <Link
                          href={hrefFor('location', loc.slug)}
                          className="flex items-center gap-2 rounded-md border border-transparent px-3 py-2 transition-colors hover:border-border hover:bg-night-2/50"
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm text-parchment">{loc.name}</span>
                            <span className="block truncate text-xs text-mist">
                              {loc.region ?? typeLabel(loc.type)}
                            </span>
                          </span>
                          <span className="rounded-full border border-border bg-night-2/60 px-2 py-0.5 text-[10px] text-mist">
                            {ageLabel(loc.age)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {layerFilter === 'second-age' && (
              <>
                <h3 className="font-display text-xs uppercase tracking-[0.2em] text-gold">
                  Second Age · {filteredSecondAge.length}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-mist">
                  Second-Age places belong to a geography the Third-Age map cannot show — Númenor
                  sank beneath the Sea at the Downfall. They are documented as text entries.
                </p>
                {filteredSecondAge.length === 0 ? (
                  <p className="mt-3 text-sm text-mist">No places match your search.</p>
                ) : (
                  <ul className="mt-2 space-y-1">
                    {filteredSecondAge.map((loc) => (
                      <li key={loc.id}>
                        <Link
                          href={hrefFor('location', loc.slug)}
                          className="flex items-center gap-2 rounded-md border border-transparent px-3 py-2 transition-colors hover:border-border hover:bg-night-2/50"
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm text-parchment">{loc.name}</span>
                            <span className="block truncate text-xs text-mist">
                              {loc.region ?? typeLabel(loc.type)}
                            </span>
                          </span>
                          <span className="rounded-full border border-border bg-night-2/60 px-2 py-0.5 text-[10px] text-mist">
                            {ageLabel(loc.age)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {layerFilter === 'off-map' && (
              <>
                <h3 className="font-display text-xs uppercase tracking-[0.2em] text-gold">
                  Off-map places · {filteredOffMap.length}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-mist">
                  Beleriand was drowned at the end of the First Age and Númenor sank in the Second,
                  so these places are documented as text entries rather than markers.
                </p>
                {filteredOffMap.length === 0 ? (
                  <p className="mt-3 text-sm text-mist">No places match your search.</p>
                ) : (
                  <ul className="mt-2 space-y-1">
                    {filteredOffMap.map((loc) => (
                      <li key={loc.id}>
                        <Link
                          href={hrefFor('location', loc.slug)}
                          className="flex items-center gap-2 rounded-md border border-transparent px-3 py-2 transition-colors hover:border-border hover:bg-night-2/50"
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm text-parchment">{loc.name}</span>
                            <span className="block truncate text-xs text-mist">
                              {loc.region ?? typeLabel(loc.type)}
                            </span>
                          </span>
                          <span className="rounded-full border border-border bg-night-2/60 px-2 py-0.5 text-[10px] text-mist">
                            {ageLabel(loc.age)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}