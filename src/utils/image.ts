import { CARD_IMAGE } from '@/constants/image';

/**
 * Pads a number with a leading zero if it's less than 10.
 *
 * @param n - The number to pad
 * @returns A two-digit string
 */
const pad = (n: number): string => n.toString().padStart(2, '0');

/**
 * Generates a timestamped filename for Doha card images.
 *
 * @returns Filename in format: kabir-doha-image_YYYY-MM-DD_HH-MM-SS.png
 */
export const getFileName = (): string => {
  const now = new Date();
  return `kabir-doha-image_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}.png`;
};

/**
 * Retrieves the DOM element used for generating card images.
 *
 * @returns The DOM element if found, otherwise logs error and returns null
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
 * @returns A PNG blob of the captured element, or null if element not found
 * @throws Error if dom-to-image fails to generate the blob
 */
export const generateBlob = async (): Promise<Blob | null> => {
  const node = getDownloadElement();
  if (!node) return null;

  const rect = node.getBoundingClientRect();
  const width = rect.width * CARD_IMAGE.scale_factor;
  const height = rect.height * CARD_IMAGE.scale_factor;

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
 * @param blob - The blob to download
 */
export const triggerDownload = (blob: Blob): void => {
  const link = document.createElement('a');
  link.download = getFileName();
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
};
