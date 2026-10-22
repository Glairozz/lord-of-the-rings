'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function HeroSearch({
  placeholder = 'Search characters, races, or legends...',
  className = '',
}: {
  placeholder?: string;
  className?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/characters?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form onSubmit={submit} className={`relative w-full max-w-2xl ${className}`}>
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-mist" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-full border border-border bg-night/80 pl-11 pr-4 text-sm text-parchment placeholder:text-mist backdrop-blur focus:border-gold focus:outline-none"
      />
    </form>
  );
}
