'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  Home,
  LocateFixed,
  Maximize,
  Minimize,
  Search,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import type { Location } from '@/types/content';
import { mapImages } from '@/data/images';
import { hrefFor } from '@/lib/content';
import LoreImage from '@/components/ui/LoreImage';
import { useExperienceGuide } from '@/components/experience/ExperienceProvider';
import {
  atlasCategories,
  atlasCategoryCounts,
  atlasCategoryOf,
  atlasCategoryOfLocation,
  atlasOffMap,
  atlasPlaceById,
  atlasPlaces,
  clusterMarkers,
  groupByRegion,
  isKeyPlace,
  MAP_H,
  MAP_W,
  matchesAtlasQuery,
  resolveMarkers,
  type AtlasCategoryId,
  type AtlasCluster,
  type AtlasMarker,
} from '@/lib/atlas';
import LocationPanel from './LocationPanel';

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 8;
const ZOOM_STEP = 1.25;
const CENTER_ZOOM = 1.6;
const FIT_PADDING = 24;
/** Markers closer than this on screen are merged into a cluster. */
const CLUSTER_SCREEN_PX = 32;
/** Arrow-key pan distance, in screen pixels. */
const KEY_PAN = 48;

type CategoryFilter = AtlasCategoryId | 'all';

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

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function ControlButton({
  icon: Icon,
  label,
  onClick,
  pressed,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  onClick: () => void;
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={pressed}
      className="flex h-9 w-9 items-center justify-center gap-2 rounded-md border border-border bg-night-2/90 px-2.5 text-parchment backdrop-blur transition-colors hover:border-gold/60 hover:text-gold md:w-auto"
    >
      <Icon size={16} aria-hidden />
      <span className="hidden text-xs md:inline">{label}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function AtlasExplorer() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const { openGuide } = useExperienceGuide();

  const [zoom, setZoom] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [keyOnly, setKeyOnly] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
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

  /** Move the view so a point (in image percent) sits at the centre. */
  const centerOn = useCallback(
    (xPercent: number, yPercent: number, targetZoom: number) => {
      const el = viewportRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const z = clamp(targetZoom, MIN_ZOOM, MAX_ZOOM);
      const px = (xPercent / 100) * MAP_W;
      const py = (yPercent / 100) * MAP_H;
      const clamped = clampView(z, rect.width / 2 - px * z, rect.height / 2 - py * z, rect.width, rect.height);
      setView(clamped.zoom, clamped.tx, clamped.ty);
    },
    [clampView, setView],
  );

  const panBy = useCallback(
    (dx: number, dy: number) => {
      const el = viewportRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const v = viewRef.current;
      const clamped = clampView(v.zoom, v.tx + dx, v.ty + dy, rect.width, rect.height);
      setView(clamped.zoom, clamped.tx, clamped.ty);
    },
    [clampView, setView],
  );

  /* ----------------------------- derived data --------------------- */

  const markers = useMemo(() => resolveMarkers(atlasPlaces), []);
  const markerById = useMemo(() => new Map(markers.map((m) => [m.location.id, m])), [markers]);
  const categoryCounts = useMemo(() => atlasCategoryCounts(atlasPlaces), []);

  const selected = useMemo(
    () => (selectedId ? atlasPlaceById.get(selectedId) ?? null : null),
    [selectedId],
  );

  const querying = query.trim().length > 0;

  const passesFilters = useCallback(
    (location: Location) => {
      if (categoryFilter !== 'all' && atlasCategoryOf(location.type) !== categoryFilter) return false;
      if (keyOnly && !isKeyPlace(location)) return false;
      return true;
    },
    [categoryFilter, keyOnly],
  );

  const filteredMarkers = useMemo(
    () => markers.filter((m) => passesFilters(m.location)),
    [markers, passesFilters],
  );

  const matchedIds = useMemo(() => {
    const set = new Set<string>();
    for (const m of filteredMarkers) {
      if (matchesAtlasQuery(m.location, query)) set.add(m.location.id);
    }
    return set;
  }, [filteredMarkers, query]);

  const clusters = useMemo(
    () => clusterMarkers(filteredMarkers, zoom, CLUSTER_SCREEN_PX),
    [filteredMarkers, zoom],
  );

  const listPlaces = useMemo(
    () => filteredMarkers.filter((m) => matchedIds.has(m.location.id)).map((m) => m.location),
    [filteredMarkers, matchedIds],
  );

  const groups = useMemo(() => groupByRegion(listPlaces), [listPlaces]);

  const offMapMatched = useMemo(
    () => atlasOffMap.filter((l) => matchesAtlasQuery(l, query)),
    [query],
  );

  const totalShown = listPlaces.length;

  /* ----------------------------- actions -------------------------- */

  const focusPlace = useCallback(
    (location: Location) => {
      setSelectedId(location.id);
      setPanelOpen(true);
      const marker = markerById.get(location.id);
      const x = marker?.x ?? location.coordinates?.x;
      const y = marker?.y ?? location.coordinates?.y;
      if (x !== undefined && y !== undefined) {
        centerOn(x, y, Math.max(viewRef.current.zoom, CENTER_ZOOM));
      }
    },
    [centerOn, markerById],
  );

  const selectMarker = useCallback(
    (marker: AtlasMarker) => {
      setSelectedId(marker.location.id);
      setPanelOpen(true);
      centerOn(marker.x, marker.y, viewRef.current.zoom);
    },
    [centerOn],
  );

  const handleCluster = useCallback(
    (cluster: AtlasCluster) => {
      const next = viewRef.current.zoom * 1.9;
      if (next > MAX_ZOOM * 0.98) {
        // Cannot separate any further — open the first place instead.
        const first = cluster.markers[0];
        if (first) selectMarker(first);
        return;
      }
      setSelectedId(null);
      centerOn(cluster.x, cluster.y, next);
    },
    [centerOn, selectMarker],
  );

  /* ----------------------------- effects -------------------------- */

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    fitView();
    const ro = new ResizeObserver(fitView);
    ro.observe(el);
    return () => ro.disconnect();
  }, [fitView]);

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
    if ((e.target as HTMLElement).closest('button, a, input, summary, details')) return;
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
        dragRef.current = {
          pointerId: id,
          startX: pos.x,
          startY: pos.y,
          startTx: v.tx,
          startTy: v.ty,
        };
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

  const handleViewportKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          panBy(KEY_PAN, 0);
          break;
        case 'ArrowRight':
          e.preventDefault();
          panBy(-KEY_PAN, 0);
          break;
        case 'ArrowUp':
          e.preventDefault();
          panBy(0, KEY_PAN);
          break;
        case 'ArrowDown':
          e.preventDefault();
          panBy(0, -KEY_PAN);
          break;
        case '+':
        case '=':
          e.preventDefault();
          zoomBy(ZOOM_STEP);
          break;
        case '-':
        case '_':
          e.preventDefault();
          zoomBy(1 / ZOOM_STEP);
          break;
        case '0':
          e.preventDefault();
          fitView();
          break;
        default:
          break;
      }
    },
    [fitView, panBy, zoomBy],
  );

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const first = listPlaces[0];
      if (first) focusPlace(first);
    }
  };

  const clearFilters = () => {
    setQuery('');
    setCategoryFilter('all');
    setKeyOnly(false);
  };

  const hasActiveFilters = querying || categoryFilter !== 'all' || keyOnly;

  /* ----------------------------- render ---------------------------- */

  return (
    <div className="panel overflow-hidden">
      {/* Toolbar: legend + hint + guide */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-mist">
          {atlasCategories.map((c) => (
            <span key={c.id} className="flex items-center gap-1.5">
              <span aria-hidden className={`text-sm ${c.tone}`}>
                {c.glyph}
              </span>
              {c.label}
              <span className="text-mist/70">· {categoryCounts[c.id]}</span>
            </span>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-3">
          <p className="hidden text-xs text-mist xl:block">
            Drag to pan · scroll or pinch to zoom. Marker size carries no meaning.
          </p>
          <button
            type="button"
            onClick={openGuide}
            className="rounded-full border border-border px-3 py-1 text-xs text-parchment-2 transition-colors hover:border-gold hover:text-gold-light"
          >
            How to explore
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_22rem]">
        {/* ----------------------------- Map ----------------------------- */}
        <div
          ref={viewportRef}
          role="application"
          tabIndex={0}
          aria-label="Interactive map of Middle-earth. Use arrow keys to pan, plus and minus to zoom, and 0 to reset. Drag to pan."
          onKeyDown={handleViewportKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
          className={`relative aspect-square min-h-[58vh] w-full touch-none select-none overflow-hidden bg-night-2 outline-none focus-visible:ring-2 focus-visible:ring-gold-light ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          } ${isFullscreen ? 'aspect-auto h-full' : 'lg:aspect-auto lg:h-[72vh]'}`}
        >
          {/* Stage */}
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

            {clusters.map((cluster) => {
              if (cluster.markers.length > 1) {
                const containsMatch =
                  !querying || cluster.markers.some((m) => matchedIds.has(m.location.id));
                const dimmed = querying && !containsMatch;
                return (
                  <button
                    key={`cluster-${cluster.id}`}
                    type="button"
                    className="map-marker group absolute z-10 outline-none"
                    style={{ left: `${cluster.x}%`, top: `${cluster.y}%`, width: 0, height: 0 }}
                    aria-label={`${cluster.markers.length} places grouped here. Activate to zoom in.`}
                    onClick={() => handleCluster(cluster)}
                  >
                    <span
                      className="relative block"
                      style={{
                        transform: `translate(-50%, -50%) scale(${1 / zoom})`,
                        transformOrigin: 'center center',
                      }}
                    >
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-gold bg-night text-[11px] font-display text-gold-light shadow-lg transition-transform group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-gold-light ${
                          dimmed ? 'opacity-40' : ''
                        }`}
                      >
                        {cluster.markers.length}
                      </span>
                    </span>
                  </button>
                );
              }

              const marker = cluster.markers[0];
              const loc = marker.location;
              const category = atlasCategoryOfLocation(loc);
              const isSelected = selectedId === loc.id;
              const isMatch = matchedIds.has(loc.id);
              const dimmed = querying && !isMatch;
              const showLabel = isSelected || (querying && isMatch);

              return (
                <button
                  key={loc.id}
                  type="button"
                  className="map-marker group absolute z-10 outline-none"
                  style={{ left: `${marker.x}%`, top: `${marker.y}%`, width: 0, height: 0 }}
                  aria-label={`${loc.name}, ${category.singular}${loc.region ? `, ${loc.region}` : ''}`}
                  aria-pressed={isSelected}
                  onClick={() => selectMarker(marker)}
                  onFocus={() => selectMarker(marker)}
                >
                  <span
                    className="relative block"
                    style={{
                      transform: `translate(-50%, -50%) scale(${1 / zoom})`,
                      transformOrigin: 'center center',
                    }}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border text-[12px] leading-none shadow-md transition-transform group-hover:scale-125 ${category.tone} ${
                        isSelected
                          ? 'border-gold-light bg-gold/30 ring-2 ring-gold-light'
                          : 'border-border bg-night-2/95'
                      } ${!isSelected && querying && isMatch ? 'ring-2 ring-gold/70' : ''} ${
                        dimmed ? 'opacity-30' : ''
                      } group-focus-visible:ring-2 group-focus-visible:ring-gold-light`}
                    >
                      {category.glyph}
                    </span>
                    <span
                      className={`pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-night-2/95 px-1.5 py-0.5 font-display text-[10px] tracking-wide text-parchment shadow-md transition-opacity ${
                        showLabel ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
                      }`}
                    >
                      {loc.name}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Map controls */}
          <div
            className="absolute right-3 top-3 z-20 flex flex-col items-end gap-1.5"
            onPointerDown={(e) => e.stopPropagation()}
            role="group"
            aria-label="Map controls"
          >
            <ControlButton icon={ZoomIn} label="Zoom in" onClick={() => zoomBy(ZOOM_STEP)} />
            <ControlButton icon={ZoomOut} label="Zoom out" onClick={() => zoomBy(1 / ZOOM_STEP)} />
            <ControlButton icon={Home} label="Reset view" onClick={fitView} />
            <ControlButton
              icon={isFullscreen ? Minimize : Maximize}
              label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              onClick={toggleFullscreen}
              pressed={isFullscreen}
            />
          </div>

          {/* Accessible view status */}
          <p className="sr-only" aria-live="polite">
            {querying
              ? `${totalShown} ${totalShown === 1 ? 'place matches' : 'places match'} your search.`
              : `${totalShown} places shown on the map.`}
          </p>
        </div>

        {/* --------------------------- Sidebar --------------------------- */}
        <aside className="flex flex-col border-t border-border lg:max-h-[72vh] lg:border-l lg:border-t-0">
          {/* Mobile panel toggle */}
          <button
            type="button"
            onClick={() => setPanelOpen((v) => !v)}
            aria-expanded={panelOpen}
            aria-controls="atlas-sidebar"
            className="flex items-center justify-between gap-2 px-4 py-3 text-left lg:hidden"
          >
            <span className="font-display text-xs uppercase tracking-[0.2em] text-gold">
              {selected ? selected.name : `Places · ${totalShown}`}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-mist">
              {panelOpen ? 'Hide' : 'Browse places'}
              <ChevronDown size={14} aria-hidden className={`transition-transform ${panelOpen ? 'rotate-180' : ''}`} />
            </span>
          </button>

          <div
            id="atlas-sidebar"
            className={`min-h-0 flex-1 flex-col ${panelOpen ? 'flex' : 'hidden'} max-h-[65vh] lg:flex lg:max-h-none`}
          >
            {selected ? (
              <LocationPanel
                location={selected}
                onClose={() => setSelectedId(null)}
                onSelectOnMap={(loc) => focusPlace(loc)}
                onCenter={() => {
                  const m = markerById.get(selected.id);
                  if (m) centerOn(m.x, m.y, Math.max(viewRef.current.zoom, CENTER_ZOOM));
                }}
              />
            ) : (
              <>
                {/* Search + filters */}
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
                      onKeyDown={handleSearchKeyDown}
                      placeholder="Search places, regions, aliases…"
                      aria-label="Search places in the atlas"
                      className="w-full rounded-md border border-border bg-night-2/70 py-2 pl-9 pr-9 text-sm text-parchment placeholder:text-mist focus:border-gold/60 focus:outline-none"
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => setQuery('')}
                        aria-label="Clear search"
                        className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded text-mist transition-colors hover:text-parchment"
                      >
                        <X size={12} aria-hidden />
                      </button>
                    )}
                  </div>

                  <div role="group" aria-label="Filter by kind of place" className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setCategoryFilter('all')}
                      aria-pressed={categoryFilter === 'all'}
                      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                        categoryFilter === 'all'
                          ? 'border-gold/70 bg-gold/15 text-gold-light'
                          : 'border-border bg-night-2/60 text-mist hover:text-parchment'
                      }`}
                    >
                      All kinds
                    </button>
                    {atlasCategories.map((c) => {
                      const active = categoryFilter === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCategoryFilter(active ? 'all' : c.id)}
                          aria-pressed={active}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors ${
                            active
                              ? 'border-gold/70 bg-gold/15 text-gold-light'
                              : 'border-border bg-night-2/60 text-mist hover:text-parchment'
                          }`}
                        >
                          <span aria-hidden>{c.glyph}</span>
                          {c.label}
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => setKeyOnly((v) => !v)}
                      aria-pressed={keyOnly}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors ${
                        keyOnly
                          ? 'border-gold/70 bg-gold/15 text-gold-light'
                          : 'border-border bg-night-2/60 text-mist hover:text-parchment'
                      }`}
                    >
                      <span aria-hidden>✦</span>
                      Important places
                    </button>
                  </div>
                </div>

                {/* Results */}
                <div className="min-h-0 flex-1 overflow-y-auto p-4">
                  <p className="text-xs text-mist" aria-live="polite">
                    {totalShown} {totalShown === 1 ? 'place' : 'places'}
                    {hasActiveFilters ? ' match your filters' : ''}
                  </p>

                  {totalShown === 0 ? (
                    <div className="mt-4 rounded-lg border border-border/70 bg-night-2/40 px-4 py-6 text-center">
                      <p className="text-sm text-parchment-2">No places match your search.</p>
                      <p className="mt-1 text-xs text-mist">
                        Try another spelling or alternate name, or clear the filters.
                      </p>
                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={clearFilters}
                          className="mt-4 rounded-full border border-border px-3 py-1.5 text-xs text-parchment-2 transition-colors hover:border-gold hover:text-gold-light"
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="mt-3 space-y-4">
                      {groups.map((group) => (
                        <details key={group.region} open className="group">
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 py-1">
                            <span className="font-display text-xs uppercase tracking-[0.2em] text-gold">
                              {group.region}
                            </span>
                            <span className="flex items-center gap-1 text-[11px] text-mist">
                              {group.places.length}
                              <ChevronDown size={12} aria-hidden className="transition-transform group-open:rotate-180" />
                            </span>
                          </summary>
                          <ul className="mt-1 space-y-0.5">
                            {group.places.map((loc) => {
                              const category = atlasCategoryOfLocation(loc);
                              const isSelected = selectedId === loc.id;
                              return (
                                <li key={loc.id}>
                                  <button
                                    type="button"
                                    onClick={() => focusPlace(loc)}
                                    aria-pressed={isSelected}
                                    className={`flex w-full items-center gap-2.5 rounded-md border px-2.5 py-2 text-left transition-colors ${
                                      isSelected
                                        ? 'border-gold/50 bg-gold/10'
                                        : 'border-transparent hover:border-border hover:bg-night-2/50'
                                    }`}
                                  >
                                    <span aria-hidden className={category.tone}>
                                      {category.glyph}
                                    </span>
                                    <span className="min-w-0 flex-1">
                                      <span
                                        className={`block truncate text-sm ${
                                          isSelected ? 'text-gold-light' : 'text-parchment'
                                        }`}
                                      >
                                        {loc.name}
                                      </span>
                                      {loc.region && (
                                        <span className="block truncate text-xs text-mist">{loc.region}</span>
                                      )}
                                    </span>
                                    <LocateFixed
                                      size={13}
                                      aria-hidden
                                      className={isSelected ? 'text-gold' : 'text-mist/70'}
                                    />
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </details>
                      ))}
                    </div>
                  )}

                  {/* Documented elsewhere */}
                  {offMapMatched.length > 0 && (
                    <details className="group mt-6 border-t border-border pt-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 py-1">
                        <span className="font-display text-xs uppercase tracking-[0.2em] text-gold">
                          Documented elsewhere
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-mist">
                          {offMapMatched.length}
                          <ChevronDown size={12} aria-hidden className="transition-transform group-open:rotate-180" />
                        </span>
                      </summary>
                      <p className="mt-2 text-xs leading-relaxed text-mist">
                        Places of the First and Second Ages cannot sit on a Third-Age map; they are
                        kept as text entries in the archive.
                      </p>
                      <ul className="mt-2 space-y-0.5">
                        {offMapMatched.map((loc) => (
                          <li key={loc.id}>
                            <Link
                              href={hrefFor('location', loc.slug)}
                              className="flex items-center gap-2.5 rounded-md border border-transparent px-2.5 py-2 transition-colors hover:border-border hover:bg-night-2/50"
                            >
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm text-parchment">{loc.name}</span>
                                {loc.region && (
                                  <span className="block truncate text-xs text-mist">{loc.region}</span>
                                )}
                              </span>
                              <span className="rounded-full border border-border bg-night-2/60 px-2 py-0.5 text-[10px] text-mist">
                                {ageLabel(loc.age)}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
