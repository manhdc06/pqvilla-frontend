import { Cormorant_Garamond, Montserrat } from 'next/font/google';

const sans = Montserrat({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
  fallback: ['-apple-system', 'system-ui', 'sans-serif'],
  preload: true,
  weight: ['300', '400', '500', '600', '700', '800'],
});

const heading = Cormorant_Garamond({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-heading',
  fallback: ['Georgia', 'serif'],
  preload: true,
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
});

export { sans, heading };
