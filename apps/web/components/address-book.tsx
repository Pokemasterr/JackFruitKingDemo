'use client';

import { useState } from 'react';
import { Plus, Check, Trash2 } from 'lucide-react';
import { Button, cn } from '@jk/ui';
import { useAddresses, type NewAddress } from '@/lib/address-store';

const field =
  'h-11 w-full rounded-lg border border-line bg-paper px-3.5 text-sm text-ink outline-none placeholder:text-muted/50 focus:border-forest';

const EMPTY: NewAddress = {
  label: '',
  fullName: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  pincode: '',
};

export function AddressBook() {
  const addresses = useAddresses((s) => s.addresses);
  const selectedId = useAddresses((s) => s.selectedId);
  const select = useAddresses((s) => s.select);
  const addAddress = useAddresses((s) => s.addAddress);
  const removeAddress = useAddresses((s) => s.removeAddress);

  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<NewAddress>(EMPTY);
  const [touched, setTouched] = useState(false);

  const errors = {
    fullName: form.fullName.trim().length > 1 ? '' : 'Enter a name.',
    phone: /^\d{10}$/.test(form.phone) ? '' : 'Enter a 10-digit phone.',
    line1: form.line1.trim().length > 2 ? '' : 'Enter an address.',
    city: form.city.trim() ? '' : 'Enter a city.',
    state: form.state.trim() ? '' : 'Enter a state.',
    pincode: /^\d{6}$/.test(form.pincode) ? '' : 'Enter a 6-digit pincode.',
  };
  const valid = Object.values(errors).every((e) => !e);

  function save() {
    setTouched(true);
    if (!valid) return;
    addAddress({ ...form, label: form.label.trim() || 'Other' });
    setForm(EMPTY);
    setTouched(false);
    setAdding(false);
  }

  function cancel() {
    setForm(EMPTY);
    setTouched(false);
    setAdding(false);
  }

  return (
    <div>
      <div className="space-y-3">
        {addresses.map((a) => {
          const isSelected = a.id === selectedId;
          return (
            <label
              key={a.id}
              className={cn(
                'flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors',
                isSelected ? 'border-forest bg-forest-soft/40' : 'border-line hover:bg-stone/40',
              )}
            >
              <input
                type="radio"
                name="address"
                checked={isSelected}
                onChange={() => select(a.id)}
                className="mt-1 accent-forest"
                aria-label={`Deliver to ${a.label}`}
              />
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-ink">{a.fullName}</span>
                  <span className="rounded-full bg-stone px-2 py-0.5 text-xs text-muted">
                    {a.label}
                  </span>
                  {isSelected ? (
                    <span className="inline-flex items-center gap-1 text-xs text-forest">
                      <Check className="h-3 w-3" /> Delivering here
                    </span>
                  ) : null}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">
                  {a.line1}
                  {a.line2 ? `, ${a.line2}` : ''}, {a.city}, {a.state} {a.pincode}
                </span>
                <span className="mt-0.5 block text-sm text-muted">{a.phone}</span>
              </span>
              {addresses.length > 1 ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    removeAddress(a.id);
                  }}
                  aria-label={`Remove ${a.label} address`}
                  className="shrink-0 rounded-full p-1.5 text-muted hover:bg-stone hover:text-ink"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              ) : null}
            </label>
          );
        })}
      </div>

      {!adding ? (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-dashed border-line px-4 py-3 text-sm text-forest hover:bg-stone/40"
        >
          <Plus className="h-4 w-4" /> Add new address
        </button>
      ) : (
        <div className="mt-4 rounded-lg border border-line bg-paper p-5">
          <h3 className="font-serif text-lg text-ink">New address</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Full name" error={touched ? errors.fullName : ''}>
              <input
                className={field}
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="Recipient name"
              />
            </Field>
            <Field label="Phone" error={touched ? errors.phone : ''}>
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
            <Field label="Address line 1" error={touched ? errors.line1 : ''} full>
              <input
                className={field}
                value={form.line1}
                onChange={(e) => setForm({ ...form, line1: e.target.value })}
                placeholder="House no., street"
              />
            </Field>
            <Field label="Address line 2 (optional)" full>
              <input
                className={field}
                value={form.line2}
                onChange={(e) => setForm({ ...form, line2: e.target.value })}
                placeholder="Area, landmark"
              />
            </Field>
            <Field label="City" error={touched ? errors.city : ''}>
              <input
                className={field}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </Field>
            <Field label="State" error={touched ? errors.state : ''}>
              <input
                className={field}
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
              />
            </Field>
            <Field label="Pincode" error={touched ? errors.pincode : ''}>
              <input
                className={field}
                inputMode="numeric"
                value={form.pincode}
                onChange={(e) =>
                  setForm({ ...form, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })
                }
                placeholder="6-digit pincode"
              />
            </Field>
            <Field label="Label (optional)">
              <input
                className={field}
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                placeholder="Home, Work…"
              />
            </Field>
          </div>

          <div className="mt-5 flex gap-3">
            <Button onClick={save}>Save address</Button>
            <Button variant="secondary" onClick={cancel}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  error,
  full,
  children,
}: {
  label: string;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="mb-1.5 block text-sm text-muted">{label}</label>
      {children}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
