'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import LoadingScreen from './LoadingScreen';
import WelcomeScreen from './WelcomeScreen';
import { useExperienceGuide } from './ExperienceProvider';
import { hasCompletedIntro, markIntroComplete } from '@/lib/experience';

type Phase = 'idle' | 'loading' | 'welcome';

const emptySubscribe = () => () => {};

/**
 * The first-run experience. It shows the cinematic loading screen and welcome
 * card on the home route for a first-time visitor, then gets out of the way.
 * Returning visitors (and every other route) never see it.
 */
export default function ExperienceGate() {
  const pathname = usePathname();
  const { openGuide } = useExperienceGuide();

  // `true` only after hydration, so the server and the hydrating client agree.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const [phase, setPhase] = useState<Phase | null>(null);

  const autoStart = mounted && pathname === '/' && !hasCompletedIntro();
  const current: Phase = phase ?? (autoStart ? 'loading' : 'idle');

  // Lock the page behind the overlay. This is a DOM side effect only.
  useEffect(() => {
    if (current === 'idle') return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [current]);

  function completeIntro() {
    markIntroComplete();
    setPhase('idle');
  }

  if (current === 'loading') {
    return <LoadingScreen onComplete={() => setPhase('welcome')} />;
  }

  if (current === 'welcome') {
    return (
      <WelcomeScreen
        onStart={completeIntro}
        onExplore={() => {
          completeIntro();
          openGuide();
        }}
      />
    );
  }

  return null;
}
