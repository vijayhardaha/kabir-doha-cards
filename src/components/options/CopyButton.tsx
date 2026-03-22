import { useState, type JSX } from 'react';

import { AiOutlineCopy, AiOutlineCheck } from 'react-icons/ai';
import { PiSpinnerGapLight } from 'react-icons/pi';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { ELEMENT_ID, SCALE_FACTOR } from '@/constants/dom-to-image';
import type { CopyButtonProps } from '@/types';
import { generateBlob } from '@/utils/dom-to-image';
import { showToast } from '@/utils/toast';

const CopyButton = ({
  elementId = ELEMENT_ID.DOHA_PREVIEW,
  scaleFactor = SCALE_FACTOR.PREVIEW,
}: CopyButtonProps): JSX.Element | null => {
  const [copying, setCopying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const isSupported = 'clipboard' in navigator && 'write' in navigator.clipboard;

  const handleCopy = async (): Promise<void> => {
    try {
      setCopying(true);
      const blob = await generateBlob(elementId, scaleFactor);

      if (!blob) {
        showToast('Failed: Element not found!', 'error');
        return;
      }

      const clipboardItem = new ClipboardItem({ [blob.type]: blob });
      await navigator.clipboard.write([clipboardItem]);

      setIsCopied(true);
      showToast('Image copied to clipboard!');
      setTimeout(() => setIsCopied(false), 1000);
    } catch (error) {
      console.error('Failed to copy: ', error);
      showToast('Failed to copy, try again!', 'error');
    } finally {
      setCopying(false);
    }
  };

  if (!isSupported) {
    return null;
  }

  const screenReaderText = copying
    ? 'Copying image to clipboard'
    : isCopied
      ? 'Image copied to clipboard'
      : 'Copy image to clipboard';

  return (
    <>
      <ReactTooltip id="copy-tooltip" />

      <button
        onClick={handleCopy}
        className="icon-btn"
        aria-label={screenReaderText}
        data-tooltip-id="copy-tooltip"
        data-tooltip-content={copying ? 'Copying...' : isCopied ? 'Copied!' : 'Copy image to clipboard'}
        disabled={copying}
        aria-busy={copying}
      >
        {copying ? (
          <PiSpinnerGapLight aria-hidden="true" size={24} className="animate-spin" />
        ) : isCopied ? (
          <AiOutlineCheck aria-hidden="true" size={24} />
        ) : (
          <AiOutlineCopy aria-hidden="true" size={24} />
        )}
        <span className="sr-only">{screenReaderText}</span>
      </button>

      <button
        onClick={handleCopy}
        className="text-btn outlined"
        aria-label={screenReaderText}
        disabled={copying}
        aria-busy={copying}
      >
        {copying ? (
          <PiSpinnerGapLight aria-hidden="true" size={20} className="text-btn__icon animate-spin" />
        ) : isCopied ? (
          <AiOutlineCheck aria-hidden="true" size={20} className="text-btn__icon" />
        ) : (
          <AiOutlineCopy aria-hidden="true" size={20} className="text-btn__icon" />
        )}
        {copying ? 'Copying...' : isCopied ? 'Copied!' : 'Copy'}
      </button>
    </>
  );
};

export default CopyButton;
