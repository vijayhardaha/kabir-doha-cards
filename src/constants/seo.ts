import type { Metadata } from 'next';

import { getCanonicalUrl } from '@/utils/seo';

/**
 * Site-wide configuration values for SEO and metadata.
 */
export const SITE_CONFIG = {
  name: 'Kabir Doha Cards',
  title: 'Kabir Doha Cards - Create Personalized Spiritual Wisdom Cards',
  description:
    'Create beautiful, personalized Kabir Doha cards with ease. Share spiritual wisdom and celebrate special occasions with timeless teachings from Kabir.',
  url: 'https://kabirdohacards.vercel.app',
  classification: 'Indian Literature, Poetry, Spiritual Quotes, Educational Tools',
  category: 'Digital Tool, Image Generator, Kabir Doha, Indian Literature, Poetry',
  creator: {
    name: 'Vijay Hardaha',
    description:
      'Full-Stack Web Developer and full-time freelancer specializing in modern web applications and custom digital solutions. Experienced in WordPress and WooCommerce development, building high-performance websites and scalable e-commerce platforms.',
    jobTitle: 'Full-Stack Web Developer',
    handles: ['@vijayhardaha', '@vegan.vijay'],
    urls: {
      gravatar: 'https://gravatar.com/vijayhardaha',
      pph: 'https://pph.me/vijayhardaha',
      github: 'https://github.com/vijayhardaha',
      x: 'https://x.com/vijayhardaha',
      twitter: 'https://twitter.com/vijayhardaha',
      instagram: 'https://instagram.com/vegan.vijay',
      facebook: 'https://facebook.com/vegan.vijay',
      linkedin: 'https://linkedin.com/in/vijayhardaha',
      wordpress: 'https://profiles.wordpress.org/vijayhardaha/',
      devto: 'https://dev.to/vijayhardaha',
      stactoverflow: 'https://stackoverflow.com/users/11848895/vijay-hardaha',
      codewars: 'https://www.codewars.com/users/vijayhardaha',
      freecodecamp: 'https://www.freecodecamp.org/vijayhardaha',
    },
  },
};

/**
 * Stores the default keyword list used in site metadata.
 */
export const SEO_KEYWORDS = [
  'Kabir Doha',
  'Kabir Doha cards',
  'Kabir teachings',
  'Kabir poetry',
  'spiritual quotes',
  'inspirational quotes',
  'wisdom cards',
  'personalized cards',
  'custom cards',
  'spirituality',
  'Indian literature',
  'poetry',
  'educational tools',
  'image generator',
  'digital tool',
];

/**
 * Stores the canonical site URL resolved from the runtime environment.
 */
export const SITE_URL: string = getCanonicalUrl();

/**
 * Stores the Google Search Console verification token.
 */
export const GOOGLE_SITE_VERIFICATION = '4CyrCxZi9TWgvS-GzB1QUhgEl0bKoIzT36368e_vlx0';
export const GOOGLE_ANALYTICS_ID = 'G-GM50Y47GMH';

/**
 * Shares the title and description across metadata variants.
 */
const titleAndDescription = { title: SITE_CONFIG.title, description: SITE_CONFIG.description };

/**
 * Defines the full metadata payload for the site.
 */
export const SITE_METADATA: Metadata = {
  ...titleAndDescription,
  keywords: SEO_KEYWORDS,
  applicationName: SITE_CONFIG.name,
  generator: 'Next.js 14 | Vercel Deployment',
  referrer: 'origin-when-cross-origin',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: new URL(SITE_URL) },
  authors: [{ name: [SITE_CONFIG.creator.name, SITE_CONFIG.name].join(' / '), url: SITE_CONFIG.creator.urls.gravatar }],
  publisher: SITE_CONFIG.name,
  creator: SITE_CONFIG.name,
  classification: SITE_CONFIG.classification,
  robots: { index: true, follow: true },
  category: SITE_CONFIG.category,
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.json',
  verification: { google: GOOGLE_SITE_VERIFICATION },
  openGraph: {
    ...titleAndDescription,
    images: [{ url: '/thumbnail.png', width: 512, height: 512 }],
    type: 'website',
    siteName: SITE_CONFIG.name,
    locale: 'en_US',
    url: new URL(SITE_URL),
  },
  twitter: {
    ...titleAndDescription,
    card: 'summary_large_image',
    images: ['/thumbnail.png'],
    creator: SITE_CONFIG.creator.handles[0],
  },
  other: { lang: 'en' },
};
