'use client';

import { useEffect, useState } from 'react';

/** True only after the first client render — guards against hydration
 * mismatches when reading persisted (localStorage) cart state. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
