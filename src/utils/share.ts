import type { Platform } from '@/types';

import { getBaseUrl } from './seo';

/**
 * Generates a social media share URL for the specified platform.
 *
 * @param platform - The platform to share on ('whatsapp', 'wa', 'twitter', or 'x')
 * @returns The share URL for the specified platform
 * @throws Error if an unsupported platform is provided
 */
export const getShareUrl = (platform: Platform = 'wa'): string => {
  const message = 'Check out this amazing Kabir Doha Cards maker! Create and share beautiful cards easily.';

  const fullMessage = `${message} ${getBaseUrl()}`;
  const encodedMessage = encodeURIComponent(fullMessage);

  if (platform === 'whatsapp' || platform === 'wa') {
    return `https://wa.me/?text=${encodedMessage}`;
  } else if (platform === 'twitter' || platform === 'x') {
    return `https://twitter.com/intent/tweet?text=${encodedMessage}`;
  } else {
    throw new Error("Unsupported platform. Please use 'whatsapp', 'wa', 'twitter', or 'x'.");
  }
};
