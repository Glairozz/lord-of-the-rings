'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FALLBACK_IMAGE } from '@/data/images';

interface LoreImageProps {
  src?: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Image with a guaranteed graceful fallback. If a source is missing or fails
 * to load, the shared placeholder is shown instead of a broken image icon.
 */
export default function LoreImage({
  src,
  alt,
  fill,
  width,
  height,
  className = '',
  sizes,
  priority,
}: LoreImageProps) {
  const [failed, setFailed] = useState(false);
  const resolved = !src || failed ? FALLBACK_IMAGE : src;

  if (fill) {
    return (
      <Image
        src={resolved}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
        onError={() => setFailed(true)}
        unoptimized={resolved.endsWith('.svg')}
      />
    );
  }

  return (
    <Image
      src={resolved}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
      unoptimized={resolved.endsWith('.svg')}
    />
  );
}
