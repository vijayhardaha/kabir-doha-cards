import { getBaseUrl } from './seo';

/**
 * Generates a social media share URL (WhatsApp or Twitter) with the given message.
 *
 * @param {string} platform - The platform to generate the share URL for ('whatsapp' or 'twitter').
 * @returns {string} - The URL to share the message on the specified platform.
 */
export const getShareUrl = (platform: string = 'wa'): string => {
  const message = 'Check out this amazing Kabir Doha Cards maker! Create and share beautiful cards easily.';

  const fullMessage = `${message} ${getBaseUrl()}`;
  const encodedMessage = encodeURIComponent(fullMessage);

  if (platform === 'whatsapp' || platform === 'wa') {
    return `https://wa.me/?text=${encodedMessage}`;
  } else if (platform === 'twitter' || platform === 'x') {
    return `https://twitter.com/intent/tweet?text=${encodedMessage}`;
  } else {
    throw new Error("Unsupported platform. Please use 'whatsapp' or 'twitter'.");
  }
};
