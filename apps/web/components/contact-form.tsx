'use client';

import { useState } from 'react';
import { Button } from '@jk/ui';

/**
 * Contact form. Wired to a real Server Action (writes to DB + LogMailer) when
 * the contact feature lands; for now it validates and shows a success state.
 */
export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [done, setDone] = useState(false);

  const valid =
    form.name.trim().length > 1 &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) &&
    form.message.trim().length > 4;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-tile border border-line bg-paper p-6">
        <h2 className="font-serif text-xl text-ink">Thanks for reaching out</h2>
        <p className="mt-2 text-muted">
          We’ve got your note and will reply to {form.email} within a day or two.
        </p>
      </div>
    );
  }

  const field =
    'h-11 w-full rounded-full border border-line bg-paper px-4 text-sm text-ink outline-none placeholder:text-muted/60 focus:border-forest';

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="text-sm text-muted">
          Name
        </label>
        <input
          id="name"
          className={`mt-1.5 ${field}`}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your name"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm text-muted">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={`mt-1.5 ${field}`}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@email.com"
          required
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm text-muted">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className="mt-1.5 w-full rounded-tile border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted/60 focus:border-forest"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="How can we help?"
          required
        />
      </div>
      <Button type="submit" size="lg" disabled={!valid}>
        Send message
      </Button>
    </form>
  );
}
