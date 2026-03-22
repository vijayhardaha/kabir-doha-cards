/**
 * Formats a number to a two-digit string with leading zero.
 *
 * @param n - The number to format
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
 * Gets the download element by ID and validates its existence.
 *
 * @param elementId - The ID of the element to get
 * @returns The DOM element if found, otherwise null
 */
export const getDownloadElement = (elementId: string): HTMLElement | null => {
  const node = document.getElementById(elementId);
  if (!node) {
    console.error(`Element with id '${elementId}' not found.`);
    return null;
  }
  return node;
};

/**
 * Generates a blob from a DOM element using dom-to-image.
 *
 * @param elementId - The ID of the element to capture
 * @param scaleFactor - The scale factor for the output image
 * @returns A blob of the captured element, or null if element not found
 */
export const generateBlob = async (elementId: string, scaleFactor: number): Promise<Blob | null> => {
  const node = getDownloadElement(elementId);
  if (!node) return null;

  const rect = node.getBoundingClientRect();
  const width = rect.width * scaleFactor;
  const height = rect.height * scaleFactor;

  const options = {
    width,
    height,
    style: { transform: `scale(${scaleFactor})`, transformOrigin: 'top left' as const },
  };

  const { default: domtoimage } = await import('dom-to-image');
  const blob = await domtoimage.toBlob(node, options);

  return blob;
};

/**
 * Triggers a download of a blob with a generated filename.
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
