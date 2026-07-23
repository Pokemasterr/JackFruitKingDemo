'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@jk/ui';
import { PRODUCTS } from '@/lib/catalog';

const field =
  'h-11 w-full rounded-lg border border-line bg-paper px-3.5 text-sm text-ink outline-none placeholder:text-muted/50 focus:border-forest';

/**
 * B2B enquiry. Wired to a Server Action (DB + Mailer) when the database lands;
 * for now it validates and confirms.
 */
export function QuoteForm({ defaultProduct = '' }: { defaultProduct?: string }) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: defaultProduct,
    volume: '',
    message: '',
  });
  const [touched, setTouched] = useState(false);
  const [done, setDone] = useState(false);

  const errors = {
    name: form.name.trim().length > 1 ? '' : 'Enter your name.',
    company: form.company.trim().length > 1 ? '' : 'Enter your company.',
    email: /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) ? '' : 'Enter a valid email.',
    product: form.product ? '' : 'Choose a product.',
  };
  const valid = Object.values(errors).every((e) => !e);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    setDone(true);
  }

  if (done) {
    const chosen = PRODUCTS.find((p) => p.slug === form.product);
    return (
      <div className="rounded-tile border border-line bg-paper p-8">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-forest text-cream">
          <Check className="h-6 w-6" strokeWidth={2.5} />
        </div>
        <h2 className="mt-5 font-serif text-2xl text-ink">Enquiry received</h2>
        <p className="mt-2 leading-relaxed text-muted">
          Thanks {form.name.split(' ')[0]} — we’ve logged your interest in{' '}
          <span className="text-ink">{chosen?.name ?? 'our range'}</span>. Our team will reply to{' '}
          {form.email} within two working days with specifications and pricing.
        </p>
        <p className="mt-4 text-sm text-muted">
          In a hurry? Call <span className="text-ink">+91 8275455176</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" error={touched ? errors.name : ''}>
          <input
            className={field}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Full name"
          />
        </Field>
        <Field label="Company" error={touched ? errors.company : ''}>
          <input
            className={field}
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Business name"
          />
        </Field>
        <Field label="Email" error={touched ? errors.email : ''}>
          <input
            className={field}
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
          />
        </Field>
        <Field label="Phone (optional)">
          <input
            className={field}
            inputMode="numeric"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })
            }
            placeholder="10-digit number"
          />
        </Field>
        <Field label="Product of interest" error={touched ? errors.product : ''}>
          <select
            className={field}
            value={form.product}
            onChange={(e) => setForm({ ...form, product: e.target.value })}
          >
            <option value="">Select a product…</option>
            {PRODUCTS.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Indicative volume (optional)">
          <input
            className={field}
            value={form.volume}
            onChange={(e) => setForm({ ...form, volume: e.target.value })}
            placeholder="e.g. 500 kg / month"
          />
        </Field>
      </div>

      <Field label="How will you use it? (optional)">
        <textarea
          rows={4}
          className="w-full rounded-tile border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted/50 focus:border-forest"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Application, format, target launch…"
        />
      </Field>

      <Button type="submit" size="lg">
        Request a quote
      </Button>
      {touched && !valid ? (
        <p className="text-xs text-red-600">Please complete the highlighted fields.</p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-muted">{label}</label>
      {children}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
