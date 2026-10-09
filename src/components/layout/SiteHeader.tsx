'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  ChevronDown,
  Compass,
  Flag,
  Gem,
  Map as MapIcon,
  Menu,
  MessageSquare,
  Mountain,
  Quote,
  ScrollText,
  Users,
  X,
} from 'lucide-react';
import { navGroups, siteConfig } from '@/lib/site';
import SearchDialog from './SearchDialog';
import ThemeToggle from './ThemeToggle';

const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  map: MapIcon,
  mountain: Mountain,
  users: Users,
  flag: Flag,
  gem: Gem,
  scroll: ScrollText,
  book: BookOpen,
  quote: Quote,
  message: MessageSquare,
  compass: Compass,
};

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus whenever the route changes (the recommended "adjust state
  // during render" pattern — the guard stops a render loop).
  const [seenPathname, setSeenPathname] = useState(pathname);
  if (seenPathname !== pathname) {
    setSeenPathname(pathname);
    setOpenGroup(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenGroup(null);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function scheduleClose() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenGroup(null), 140);
  }
  function cancelClose() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-border bg-night/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="font-display text-lg tracking-[0.2em] text-gold-light transition-colors hover:text-parchment"
        >
          {siteConfig.shortName}
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navGroups.map((group) => {
              const isOpen = openGroup === group.label;
              const active = group.items.some((item) => pathname.startsWith(item.href));
              return (
                <li
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenGroup(group.label);
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenGroup(isOpen ? null : group.label)}
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm transition-colors ${
                      active || isOpen ? 'text-gold-light' : 'text-parchment-2 hover:text-gold-light'
                    }`}
                  >
                    {group.label}
                    <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="absolute left-0 top-full w-72 pt-2">
                      <div className="panel p-2">
                        {group.items.map((item) => {
                          const Icon = item.icon ? icons[item.icon] : undefined;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-night-3"
                            >
                              {Icon && <Icon size={18} className="mt-0.5 shrink-0 text-gold" />}
                              <span>
                                <span className="block font-display text-sm text-parchment">{item.label}</span>
                                {item.description && (
                                  <span className="mt-0.5 block text-xs text-mist">{item.description}</span>
                                )}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <SearchDialog />
          <ThemeToggle />
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-parchment-2 transition-colors hover:border-gold hover:text-gold-light lg:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-night/98 backdrop-blur-md lg:hidden">
          <nav aria-label="Mobile" className="mx-auto max-h-[75vh] max-w-7xl overflow-y-auto px-4 py-4">
            {navGroups.map((group) => (
              <div key={group.label} className="mb-4">
                <p className="mb-2 font-display text-xs uppercase tracking-[0.2em] text-gold">{group.label}</p>
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block rounded-lg border border-border/60 px-3 py-2.5 text-sm text-parchment transition-colors hover:border-gold hover:text-gold-light"
                      >
                        {item.label}
                        {item.description && <span className="mt-0.5 block text-xs text-mist">{item.description}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
