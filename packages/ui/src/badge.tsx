import * as React from 'react';
import { cn } from './utils/cn';

type Tone = 'forest' | 'mustard' | 'neutral';

const tones: Record<Tone, string> = {
  forest: 'bg-forest-soft text-forest-deep',
  mustard: 'bg-mustard-soft text-mustard',
  neutral: 'bg-stone text-muted',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

/** Quiet pill used for flags / eyebrows. */
export function Badge({ className, tone = 'forest', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs font-medium',
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
