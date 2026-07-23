import type { Config } from 'tailwindcss';
import preset from '@jk/config/tailwind-preset';

const config: Config = {
  presets: [preset],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    // Pick up Tailwind classes used inside the shared UI package.
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
