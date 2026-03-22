import { useState, useLayoutEffect, type JSX } from 'react';

import Image from 'next/image';
import { PiSpinnerGapLight } from 'react-icons/pi';
import { TbExternalLink, TbShare } from 'react-icons/tb';

import { generateBlob, triggerDownload, getFileName } from '@/utils/image';
import { showToast } from '@/utils/toast';

interface ImageDrawerProps {
  blobUrl: string;
  isOpen: boolean;
  isDownloading: boolean;
  onClose: () => void;
  onOpen: () => void;
  onShare: () => void;
  canShare: boolean;
}

const ImageDrawer = ({
  blobUrl,
  isOpen,
  isDownloading,
  onClose,
  onOpen,
  onShare,
  canShare,
}: ImageDrawerProps): JSX.Element | null => {
  if (!isOpen) return null;

  return (
    <>
      <div className="image-drawer__overlay" aria-hidden="true" onClick={onClose} />
      <div className="image-drawer" role="dialog" aria-modal="true" aria-label="Download options">
        <div className="image-drawer__content">
          <div className="image-drawer__image-wrapper">
            <Image src={blobUrl} alt="Preview" className="image-drawer__image" width={400} height={400} />
          </div>

          <div className="image-drawer__actions">
            <button onClick={onOpen} className="image-drawer__btn image-drawer__btn--primary" disabled={isDownloading}>
              {isDownloading ? (
                <PiSpinnerGapLight aria-hidden="true" size={18} className="image-drawer__btn-icon animate-spin" />
              ) : (
                <TbExternalLink aria-hidden="true" size={18} className="image-drawer__btn-icon" />
              )}
              Open
            </button>
            {canShare && (
              <button onClick={onShare} className="image-drawer__btn image-drawer__btn--secondary">
                <TbShare aria-hidden="true" size={18} className="image-drawer__btn-icon" />
                Share
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const triggerDownloadFromUrl = (url: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = getFileName();
  link.click();
};

const MOBILE_BREAKPOINT = 600;

export const useImageDrawer = () => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDownload = async (onSuccess?: () => void): Promise<void> => {
    setIsDownloading(true);
    const blob = await generateBlob();
    setIsDownloading(false);

    if (!blob) {
      showToast('Failed: Element not found!', 'error');
      return;
    }

    const url = URL.createObjectURL(blob);
    setBlobUrl(url);

    if (isMobile) {
      setIsDrawerOpen(true);
    } else {
      triggerDownload(blob);
      onSuccess?.();
    }
  };

  const handleOpen = (): void => {
    if (blobUrl) {
      triggerDownloadFromUrl(blobUrl);
      showToast('Image downloaded successfully!');
    }
  };

  const handleShare = async (): Promise<void> => {
    if (!blobUrl) return;

    try {
      const blob = await fetch(blobUrl).then((r) => r.blob());
      const file = new File([blob], 'kabir-doha-card.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Kabir Doha Card',
          text: 'Check out this amazing Kabir Doha Card!',
        });
      } else {
        showToast('Sharing not supported on this device', 'error');
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Failed to share: ', error);
        showToast('Failed to share, try again!', 'error');
      }
    }
  };

  const handleClose = (): void => {
    setIsDrawerOpen(false);
    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
      setBlobUrl(null);
    }
  };

  const canShare = typeof navigator !== 'undefined' && 'canShare' in navigator;

  return {
    blobUrl,
    isDrawerOpen,
    isDownloading,
    isMobile,
    handleDownload,
    handleOpen,
    handleShare,
    handleClose,
    canShare,
  };
};

export { ImageDrawer };
