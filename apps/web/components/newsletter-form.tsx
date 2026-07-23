'use client';

import { useState } from 'react';
import { Button } from '@jk/ui';

/**
 * Newsletter capture. Wired to a real Server Action + `subscribers` table when
 * we build the newsletter feature; for now it validates and shows the success
 * state so the scaffold is interactive.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    setDone(true);
  }

  if (done) {
    return (
      <p className="text-sm text-forest">
        Thanks — watch your inbox for a welcome note and 10% off.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="newsletter-email" className="text-sm text-muted">
        Get 10% off your first order
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="h-11 w-full rounded-full border border-line bg-paper px-4 text-sm text-ink outline-none placeholder:text-muted/60 focus:border-forest"
        />
        <Button type="submit" size="md" className="shrink-0">
          Join
        </Button>
      </div>
    </form>
  );
}
