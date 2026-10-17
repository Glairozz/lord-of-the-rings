'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import TutorialDialog from './TutorialDialog';

interface ExperienceContextValue {
  /** Whether the "how to explore" tutorial is open. */
  guideOpen: boolean;
  openGuide: () => void;
  closeGuide: () => void;
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

/**
 * Access the shared guide so any component (header button, atlas, footer) can
 * reopen the tutorial without duplicating its state.
 */
export function useExperienceGuide(): ExperienceContextValue {
  const value = useContext(ExperienceContext);
  if (!value) {
    throw new Error('useExperienceGuide must be used within an ExperienceProvider');
  }
  return value;
}

export default function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [guideOpen, setGuideOpen] = useState(false);

  const openGuide = useCallback(() => setGuideOpen(true), []);
  const closeGuide = useCallback(() => setGuideOpen(false), []);

  const value = useMemo(
    () => ({ guideOpen, openGuide, closeGuide }),
    [guideOpen, openGuide, closeGuide],
  );

  return (
    <ExperienceContext.Provider value={value}>
      {children}
      {/* Keying by open state remounts the guide on each open, so it always starts at step one. */}
      <TutorialDialog key={guideOpen ? 'open' : 'closed'} open={guideOpen} onClose={closeGuide} />
    </ExperienceContext.Provider>
  );
}
