'use client';

import { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  label: string;
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: [0, 1] },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className="sticky top-24 hidden lg:block">
      <p className="mb-3 font-display text-xs uppercase tracking-[0.2em] text-gold">On this page</p>
      <ul className="space-y-1.5 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`-ml-px block border-l-2 py-1 pl-3 text-sm transition-colors ${
                active === item.id
                  ? 'border-gold text-gold-light'
                  : 'border-transparent text-mist hover:border-border hover:text-parchment-2'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
