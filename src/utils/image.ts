import { CARD_IMAGE } from '@/constants/image';

const pad = (n: number): string => n.toString().padStart(2, '0');

export const getFileName = (): string => {
  const now = new Date();
  return `kabir-doha-image_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}.png`;
};

export const getDownloadElement = (): HTMLElement | null => {
  const node = document.getElementById(CARD_IMAGE.element_id);
  if (!node) {
    console.error(`Element with id '${CARD_IMAGE.element_id}' not found.`);
    return null;
  }
  return node;
};

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

export const triggerDownload = (blob: Blob): void => {
  const link = document.createElement('a');
  link.download = getFileName();
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
};
