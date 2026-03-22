import { useEffect, useRef, type JSX } from 'react';

import Image from 'next/image';
import { PiSpinnerGapLight } from 'react-icons/pi';
import { TbExternalLink, TbShare } from 'react-icons/tb';

import { useImageDrawer } from '@/hooks/useImageDrawer';

const ImageDrawer = (): JSX.Element | null => {
  const { blobUrl, isDrawerOpen, isDownloading, canShare, handleOpen, handleShare, handleClose } = useImageDrawer();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDrawerOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDrawerOpen, handleClose]);

  if (!isDrawerOpen || !blobUrl) return null;

  return (
    <>
      <div className="image-drawer__overlay" aria-hidden="true" onClick={handleClose} />
      <div className="image-drawer" ref={drawerRef} role="dialog" aria-modal="true" aria-label="Download options">
        <div className="image-drawer__content">
          <div className="image-drawer__image-wrapper">
            <Image src={blobUrl} alt="Preview" className="image-drawer__image" width={400} height={400} />
          </div>

          <div className="image-drawer__actions">
            <button
              onClick={handleOpen}
              className="image-drawer__btn image-drawer__btn--primary"
              disabled={isDownloading}
            >
              {isDownloading ? (
                <PiSpinnerGapLight aria-hidden="true" size={18} className="image-drawer__btn-icon animate-spin" />
              ) : (
                <TbExternalLink aria-hidden="true" size={18} className="image-drawer__btn-icon" />
              )}
              Open
            </button>

            {/* Only show the share action when the device supports file sharing. */}
            {canShare && (
              <button onClick={handleShare} className="image-drawer__btn image-drawer__btn--secondary">
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

export { ImageDrawer };
