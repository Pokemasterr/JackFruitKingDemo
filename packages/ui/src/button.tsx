import * as React from 'react';
import { cn } from './utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium ' +
  'transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-forest/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream ' +
  'disabled:pointer-events-none disabled:opacity-50 select-none';

const variants: Record<Variant, string> = {
  primary: 'bg-forest text-cream hover:bg-forest-deep',
  secondary: 'border border-line bg-transparent text-ink hover:bg-stone/60',
  ghost: 'bg-transparent text-forest hover:text-forest-deep',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-[15px]',
  lg: 'h-12 px-7 text-base',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  ),
);
Button.displayName = 'Button';
