import { createContext, useContext, useState, useLayoutEffect, type ReactNode } from 'react';

import { generateBlob, triggerDownloadFromBlob, triggerDownloadFromUrl } from '@/utils/download';
import { showToast } from '@/utils/toast';

// Width threshold to switch to mobile drawer behavior, kept in sync with CSS media query.
const MOBILE_BREAKPOINT = 640;

/**
 * Describes the shared state and actions exposed by the image drawer hook.
 */
interface ImageDrawerContext {
  blobUrl: string | null;
  isDrawerOpen: boolean;
  isDownloading: boolean;
  isSharing: boolean;
  canShare: boolean;
  handleDownload: (onSuccess?: () => void) => Promise<void>;
  handleOpen: () => void;
  handleShare: () => Promise<void>;
  handleClose: () => void;
}

/**
 * Context for managing image drawer state and actions across download and share components.
 */
const ImageDrawerContext = createContext<ImageDrawerContext | null>(null);

/**
 * Defines the props accepted by the image drawer provider.
 */
interface ImageDrawerProviderProps {
  children: ReactNode;
}

/**
 * Provides shared drawer state for downloading and sharing generated images.
 *
 * @param {ImageDrawerProviderProps} props - The provider props.
 * @returns {ReactNode} The wrapped provider tree.
 */
const ImageDrawerProvider = ({ children }: ImageDrawerProviderProps): ReactNode => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    // Keep mobile behavior in sync with viewport width changes.
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /**
   * Generates an image blob and either downloads it or opens the mobile drawer.
   *
   * @param {(() => void) | undefined} [onSuccess] - Optional callback after direct download succeeds.
   * @returns {Promise<void>} A promise that resolves when handling completes.
   */
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

    // Mobile devices route downloads through the drawer so users can choose the next action.
    if (isMobile) {
      setIsDrawerOpen(true);
    } else {
      triggerDownloadFromBlob(blob);
      onSuccess?.();
    }
  };

  /**
   * Opens the generated image from the drawer using the prepared blob URL.
   *
   * @returns {void} Nothing.
   */
  const handleOpen = (): void => {
    if (blobUrl) {
      triggerDownloadFromUrl(blobUrl);
      showToast('Image downloaded successfully!');
    }
  };

  /**
   * Shares the generated image file when the device supports file sharing.
   *
   * @returns {Promise<void>} A promise that resolves when sharing finishes.
   */
  const handleShare = async (): Promise<void> => {
    if (!blobUrl || isSharing) return;

    setIsSharing(true);
    try {
      const blob = await fetch(blobUrl).then((r) => r.blob());
      const file = new File([blob], 'kabir-doha-card.png', { type: 'image/png' });

      // Use the native share sheet only when file sharing is available.
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
  };

  /**
   * Closes the drawer and releases any generated blob URL.
   *
   * @returns {void} Nothing.
   */
  const handleClose = (): void => {
    setIsDrawerOpen(false);
    if (blobUrl) {
      // Revoke object URLs promptly so repeated downloads do not leak memory.
      URL.revokeObjectURL(blobUrl);
      setBlobUrl(null);
    }
  };

  const canShare = typeof navigator !== 'undefined' && 'canShare' in navigator;

  const value: ImageDrawerContext = {
    blobUrl,
    isDrawerOpen,
    isDownloading,
    isSharing,
    canShare,
    handleDownload,
    handleOpen,
    handleShare,
    handleClose,
  };

  return <ImageDrawerContext.Provider value={value}>{children}</ImageDrawerContext.Provider>;
};

/**
 * Returns the shared image drawer state and actions from context.
 *
 * @returns {ImageDrawerContext} The active image drawer context value.
 * @throws {Error} When the hook is used outside the provider.
 */
const useImageDrawer = (): ImageDrawerContext => {
  const context = useContext(ImageDrawerContext);
  if (!context) {
    throw new Error('useImageDrawer must be used within ImageDrawerProvider');
  }
  return context;
};

export { ImageDrawerProvider, useImageDrawer };
