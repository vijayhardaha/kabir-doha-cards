import { CARD_IMAGE } from '@/constants/image';

/**
 * Pads a number to two digits for timestamp-based filename segments.
 *
 * @param {number} n - The number to pad.
 * @returns {string} The padded two-character string.
 */
const pad = (n: number): string => n.toString().padStart(2, '0');

/**
 * Builds a timestamped filename for generated doha card images.
 *
 * @returns {string} The generated PNG filename.
 */
export const getFileName = (): string => {
  const now = new Date();
  const parts = [
    'kabir-doha-image',
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ];
  return parts.join('_') + '.png';
};

/**
 * Retrieves the DOM element used for generating card images.
 *
 * @returns {HTMLElement | null} The target element or null when not found.
 */
export const getDownloadElement = (): HTMLElement | null => {
  const node = document.getElementById(CARD_IMAGE.element_id);
  if (!node) {
    console.error(`Element with id '${CARD_IMAGE.element_id}' not found.`);
    return null;
  }
  return node;
};

/**
 * Generates a PNG blob from the card preview element using dom-to-image.
 *
 * @returns {Promise<Blob | null>} A PNG blob of the captured element or null.
 * @throws {Error} When blob generation fails.
 */
export const generateBlob = async (): Promise<Blob | null> => {
  const node = getDownloadElement();
  if (!node) return null;

  const rect = node.getBoundingClientRect();
  const width = rect.width * CARD_IMAGE.scale_factor;
  const height = rect.height * CARD_IMAGE.scale_factor;

  // Scale the preview before capture so the exported image stays sharp.
  const options = {
    width,
    height,
    style: { transform: `scale(${CARD_IMAGE.scale_factor})`, transformOrigin: 'top left' as const },
  };

  const { default: domtoimage } = await import('dom-to-image');
  const blob = await domtoimage.toBlob(node, options);

  return blob;
};

/**
 * Triggers a file download from a blob using a generated filename.
 *
 * @param {Blob} blob - The blob to download.
 * @returns {void} Nothing.
 */
export const triggerDownloadFromBlob = (blob: Blob): void => {
  const link = document.createElement('a');
  link.download = getFileName();
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
};

/**
 * Triggers a file download from a URL.
 *
 * @param {string} url - The URL of the file to download.
 * @returns {void} Nothing.
 */
export const triggerDownloadFromUrl = (url: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = getFileName();
  link.click();
};
