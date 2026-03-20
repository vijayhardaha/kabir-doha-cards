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
  category: 'Web API',
  creator: {
    name: 'Vijay Hardaha',
    description:
      'Full-Stack Web Developer and full-time freelancer specializing in modern web applications and custom digital solutions. Experienced in WordPress and WooCommerce development, building high-performance websites and scalable e-commerce platforms.',
    jobTitle: 'Full-Stack Web Developer',
    handle: '@vijayhardaha',
    handles: ['@vijayhardaha', '@vegan.vijay'],
    urls: {
      pph: 'https://pph.me/vijayhardaha',
      github: 'https://github.com/vijayhardaha',
      instagram: 'https://instagram.com/vegan.vijay',
      facebook: 'https://facebook.com/vegan.vijay',
      linkedin: 'https://linkedin.com/in/vijayhardaha',
      wordpress: 'https://profiles.wordpress.org/vijayhardaha/',
      devto: 'https://dev.to/vijayhardaha',
      stactoverflow: 'https://stackoverflow.com/users/11848895/vijay-hardaha',
      codewars: 'https://www.codewars.com/users/vijayhardaha',
    },
  },
};

/**
 * The default metadata object used for SEO, Open Graph, and Twitter cards.
 */
export const SEO_KEYWORDS = [
  'Kabir Doha',
  'spiritual quotes',
  'personalized cards',
  'wisdom cards',
  'Kabir teachings',
  'inspirational quotes',
  'custom cards',
  'Kabir',
  'spirituality',
  'Kabir Doha cards',
];

/**
 * The base URL of the site, retrieved from environment variables.
 * Defaults to an empty string if the environment variable is not set.
 * @type {string}
 */
export const SITE_URL: string = getCanonicalUrl();

/**
 * Google Search Console verification code for the site
 */
export const GOOGLE_SITE_VERIFICATION = '4CyrCxZi9TWgvS-GzB1QUhgEl0bKoIzT36368e_vlx0';
export const GOOGLE_ANALYTICS_ID = 'G-GM50Y47GMH';

/**
 * Title and description used for SEO, Open Graph, and Twitter cards.
 */
const titleAndDescription = { title: SITE_CONFIG.title, description: SITE_CONFIG.description };

/**
 * The main metadata object containing all SEO-related information for the website.
 */
export const SITE_METADATA: Metadata = {
  ...titleAndDescription,
  keywords: SEO_KEYWORDS,
  applicationName: SITE_CONFIG.name,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: new URL(SITE_URL) },
  authors: [{ name: SITE_CONFIG.creator.name, url: 'https://instagram.com/vegan.vijay' }],
  publisher: SITE_CONFIG.creator.name,
  creator: SITE_CONFIG.creator.name,
  robots: { index: true, follow: true },
  category: SITE_CONFIG.category,
  themeColor: '#12b848',
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
    creator: SITE_CONFIG.creator.handle,
  },
  other: { lang: 'en' },
};
