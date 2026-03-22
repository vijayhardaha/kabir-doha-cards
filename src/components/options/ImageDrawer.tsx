'use client';

import type { JSX } from 'react';

import Image from 'next/image';
import { PiSpinnerGapLight } from 'react-icons/pi';
import { TbExternalLink, TbShare } from 'react-icons/tb';

import { Drawer } from '@/components/drawer/Drawer';

export interface ImageDrawerProps {
  open: boolean;
  onClose: () => void;
  blobUrl: string | null;
  canShare: boolean;
  isSharing: boolean;
  onOpen: () => void;
  onShare: () => Promise<void>;
}

/**
 * Mobile drawer displaying the generated image with open and share actions.
 *
 * @param {ImageDrawerProps} props - The drawer props.
 * @returns {JSX.Element} The rendered image drawer.
 */
export function ImageDrawer({
  open,
  onClose,
  blobUrl,
  canShare,
  isSharing,
  onOpen,
  onShare,
}: ImageDrawerProps): JSX.Element {
  return (
    <Drawer open={open} onClose={onClose} direction="bottom" ariaLabel="Download options" className="image-drawer">
      <div className="image-drawer__content">
        <div className="image-drawer__image-wrapper">
          <Image src={blobUrl || ''} alt="Preview" className="image-drawer__image" width={400} height={400} />
        </div>

        <div className="image-drawer__actions">
          <button onClick={onOpen} className="image-drawer__btn image-drawer__btn--primary">
            <TbExternalLink aria-hidden="true" size={18} className="image-drawer__btn-icon" />
            Open
          </button>

          {canShare && (
            <button onClick={onShare} className="image-drawer__btn image-drawer__btn--secondary" disabled={isSharing}>
              {isSharing ? (
                <PiSpinnerGapLight aria-hidden="true" size={18} className="image-drawer__btn-icon animate-spin" />
              ) : (
                <TbShare aria-hidden="true" size={18} className="image-drawer__btn-icon" />
              )}
              Share
            </button>
          )}
        </div>
      </div>
    </Drawer>
  );
}
