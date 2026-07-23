import type { Config } from 'tailwindcss';

/**
 * Jackfruit King design tokens — "editorial & serif" direction.
 * Warm cream canvas, generous whitespace, a characterful serif (Fraunces) for
 * headings + a clean sans (Inter) for body. Forest green is the primary colour;
 * a muted mustard is used sparingly as an accent. Hairline rules, soft radii,
 * no hard shadows. Calm, human, unhurried.
 *
 * Fonts are wired as CSS variables set by next/font in apps/web:
 *   --font-fraunces (serif headings)
 *   --font-inter    (sans body)
 */
const preset: Omit<Config, 'content'> = {
  theme: {
    extend: {
      colors: {
        cream: '#FAF6EC', // page canvas
        paper: '#FFFDF8', // cards / raised surfaces
        ink: '#20291F', // primary text (warm near-black green)
        muted: '#5E6A59', // secondary text
        forest: {
          DEFAULT: '#2E5A43', // primary brand green
          deep: '#1E3D2E',
          soft: '#DCE4D5', // green tint for placeholders/pills
        },
        stone: '#E9E3D5', // neutral placeholder / subtle fill
        line: '#E6DFCE', // hairline borders
        mustard: {
          DEFAULT: '#C79A3E', // accent, used sparingly
          soft: '#EFE2C2',
        },
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        tile: '0.875rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(32,41,31,0.04), 0 8px 24px rgba(32,41,31,0.06)',
      },
      letterSpacing: {
        label: '0.14em',
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
};

export default preset;
