import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-mist">
        <li>
          <Link href="/" className="transition-colors hover:text-gold-light">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            <ChevronRight size={12} className="text-border" aria-hidden />
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-gold-light">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-parchment-2">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
