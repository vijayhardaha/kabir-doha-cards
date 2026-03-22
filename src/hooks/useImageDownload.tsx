'use client';

import { useState, useCallback } from 'react';

import { generateBlob, triggerDownloadFromBlob, triggerDownloadFromUrl } from '@/utils/download';
import { showToast } from '@/utils/toast';

// Width threshold to switch to mobile drawer behavior, kept in sync with CSS media query.
const MOBILE_BREAKPOINT = 640;

/**
 * Describes the state and actions for downloading and sharing generated images.
 */
export interface ImageDownloadState {
  blobUrl: string | null;
  isDownloading: boolean;
  isSharing: boolean;
  canShare: boolean;
  handleDownload: (onMobileOpen: () => void, onSuccess?: () => void) => Promise<void>;
  handleOpen: () => void;
  handleShare: () => Promise<void>;
  releaseBlobUrl: () => void;
}

/**
 * Manages image blob generation, direct download, native sharing, and
 * mobile drawer delegation. Contains zero drawer state.
 *
 * @returns {ImageDownloadState} The download and share state and actions.
 */
export function useImageDownload(): ImageDownloadState {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  /**
   * Generates an image blob and either downloads it directly or calls onMobileOpen.
   *
   * @param {() => void} onMobileOpen - Callback to open the mobile drawer.
   * @param {(() => void) | undefined} [onSuccess] - Optional callback after direct download succeeds.
   * @returns {Promise<void>} Resolves when handling completes.
   */
  const handleDownload = useCallback(async (onMobileOpen: () => void, onSuccess?: () => void): Promise<void> => {
    setIsDownloading(true);
    const blob = await generateBlob();
    setIsDownloading(false);

    if (!blob) {
      showToast('Failed: Element not found!', 'error');
      return;
    }

    const url = URL.createObjectURL(blob);
    setBlobUrl(url);

    if (typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT) {
      onMobileOpen();
    } else {
      triggerDownloadFromBlob(blob);
      onSuccess?.();
    }
  }, []);

  /**
   * Opens the generated image from the prepared blob URL.
   */
  const handleOpen = useCallback((): void => {
    if (blobUrl) {
      triggerDownloadFromUrl(blobUrl);
      showToast('Image downloaded successfully!');
    }
  }, [blobUrl]);

  /**
   * Shares the generated image file when the device supports file sharing.
   */
  const handleShare = useCallback(async (): Promise<void> => {
    if (!blobUrl || isSharing) return;

    setIsSharing(true);
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
    } finally {
      setIsSharing(false);
    }
  }, [blobUrl, isSharing]);

  /**
   * Releases any held blob URL from memory.
   */
  const releaseBlobUrl = useCallback((): void => {
    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
      setBlobUrl(null);
    }
  }, [blobUrl]);

  /** Caches whether the current device supports native file sharing. */
  const canShare = typeof navigator !== 'undefined' && 'canShare' in navigator;

  return { blobUrl, isDownloading, isSharing, canShare, handleDownload, handleOpen, handleShare, releaseBlobUrl };
}
